import { useCommentReplyMutation } from '@/hooks/tanstak/use-comment-mutation'
import { ArrowRight } from '@yaksok/icons'
import { TextField, TextFieldAPI } from '@yaksok/ui'
import { FocusEvent, FormEvent, forwardRef } from 'react'

export type GeneralForumTextFieldProps = {
  disabled: boolean
  setDisabled: (disabled: boolean) => void
  postId: string
  commentId: string
  onCancelEdit?: () => void
  mode?: 'comment' | 'reply'
}

export const GeneralForumTextField = forwardRef<
  TextFieldAPI,
  GeneralForumTextFieldProps
>(function GeneralForumTextField(
  { disabled, setDisabled, postId, commentId, onCancelEdit, mode = 'comment' },
  ref
) {
  // api 댓글 생성
  const postMutation = useCommentReplyMutation({
    postId,
    mode,
    controllDisabled: setDisabled,
    commentId: postId,
    method: 'post',
  })

  // api 답글 생성
  const replyMutation = useCommentReplyMutation({
    postId,
    mode,
    controllDisabled: setDisabled,
    commentId,
    method: 'post',
  })

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const value =
      ref && typeof ref !== 'function' ? ref.current?.getValue().trim() : ''
    if (!value) return

    const mutate = mode === 'comment' ? postMutation : replyMutation
    await mutate.mutateAsync({ content: value })
    ref && typeof ref !== 'function' && ref.current?.clear()
    setDisabled(true)
    if (mode === 'reply') onCancelEdit?.()
  }

  // 인풋 입력창이 비어있을 경우 포커스 해제하면 댓글 모드로 복귀
  const handleBlur = (e: FocusEvent<HTMLFormElement>) => {
    const next = e.relatedTarget as Node | null
    if (next && e.currentTarget.contains(next)) return

    const v =
      ref && typeof ref !== 'function' ? ref.current?.getValue().trim() : ''
    if (!v) onCancelEdit?.()
  }

  return (
    <form
      className="fixed right-0 bottom-0 left-0 flex items-center gap-2 bg-white01 px-4 py-3 shadow-box"
      onSubmit={e => e.preventDefault()}
      onBlur={handleBlur}
    >
      <TextField
        ref={ref} // ✅ pass the unified ref down
        regex={/\*/} // dummy regex
        message={{}}
        mode="box"
        placeholder={
          mode === 'comment' ? '댓글을 입력해 주세요' : '답글을 입력해 주세요'
        }
        className="bg-gray07"
        onChange={e => setDisabled(e.target.value.trim().length === 0)}
      />
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
