import { useCommentReplyMutation } from '@/hooks/tanstak/use-comment-mutation'
import { ArrowRight, Undo } from '@yaksok/icons'
import { useCommentEditorStore } from '@yaksok/store'
import { FocusEvent, FormEvent, RefObject, forwardRef, useState } from 'react'

export type GeneralForumTextFieldProps = {
  postId: string
}

export const GeneralForumTextField = forwardRef<
  HTMLTextAreaElement,
  GeneralForumTextFieldProps
>(function GeneralForumTextField({ postId }, ref) {
  const [disabled, setDisabled] = useState(true)
  const { commentId, mode, text, clear, setText } = useCommentEditorStore()

  // api 댓글 생성
  const postMutation = useCommentReplyMutation({
    postId,
    mode: 'comment',
    commentId: postId,
    method: 'post',
  })

  // api 답글 생성
  const replyMutation = useCommentReplyMutation({
    postId,
    mode: 'reply',
    commentId: commentId!,
  })

  // api 댓글 수정
  const editMutation = useCommentReplyMutation({
    postId,
    commentId: commentId!,
    method: 'patch',
  })

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setDisabled(true)
    console.log(text)
    if (!text || text.trim() === '') return

    if (mode === 'edit') {
      await editMutation.mutateAsync({ content: text })
    }
    if (mode === 'reply') {
      await replyMutation.mutateAsync({ content: text })
    }
    if (mode === 'comment') {
      await postMutation.mutateAsync({ content: text })
    }
    setDisabled(false)
    clear(ref as RefObject<HTMLTextAreaElement | null>)
  }

  // 인풋 입력창이 비어있을 경우 포커스 해제하면 댓글 모드로 복귀
  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    const next = e.relatedTarget as Node | null
    if (next && e.currentTarget.contains(next)) return

    const textValue = text.trim()
    if (!textValue) {
      clear(ref as RefObject<HTMLTextAreaElement | null>)
    }
  }

  return (
    <form
      className="fixed right-0 bottom-0 left-0 flex items-center gap-2 bg-white01 px-4 py-3 shadow-box"
      onSubmit={e => e.preventDefault()}
      onBlur={handleBlur}
    >
      <textarea
        ref={ref}
        value={text}
        onChange={e => {
          setText(e.target.value)
          setDisabled(e.target.value.trim() === '')
        }}
        className="w-full rounded-[8px] bg-gray07 p-2 text-gray01 placeholder:text-gray05"
        placeholder={
          mode === 'comment'
            ? '댓글을 입력해 주세요'
            : mode === 'reply'
              ? '답글을 입력해 주세요'
              : '댓글을 수정해 주세요'
        }
        rows={1}
      />
      {mode === 'edit' && (
        <button
          onClick={() => clear(ref as RefObject<HTMLTextAreaElement | null>)}
          className="rounded-[8px] bg-black01 px-2.5 py-3 disabled:bg-subGray01"
        >
          <Undo size={16} stroke="white" strokeWidth={2} />
        </button>
      )}
      <button
        type="submit"
        className="rounded-[8px] bg-black01 px-2.5 py-3 disabled:bg-subGray01"
        onClick={handleSubmit}
        disabled={disabled}
      >
        <ArrowRight size={16} stroke="white" />
      </button>
    </form>
  )
})
GeneralForumTextField.displayName = 'GeneralForumTextField'
