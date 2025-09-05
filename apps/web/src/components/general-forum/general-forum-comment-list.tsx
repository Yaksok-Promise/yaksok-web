import { useCommentLikeOptimistic } from '@/hooks/tanstak/use-optimistic-like'
import { flattenAndMarkMostLiked } from '@/utils/change-comment-list-optimistic'
import { CommentResponse } from '@yaksok/api/commentType'
import {
  BlankHeart,
  CommunicationDot,
  MoreVertical,
  Pencil,
  Trash,
  TriangleWarning,
} from '@yaksok/icons'
import { Comment, DropDown, NotComment, TextFieldAPI } from '@yaksok/ui'
import { GeneralForumTextField } from './general-forum-text-field'
import { useMemo, useRef, useState } from 'react'
import { useCommentReplyMutation } from '@/hooks/tanstak/use-comment-mutation'

export type GeneralForumCommentListProps = {
  data: CommentResponse
  countComment: number
  postId: string
}

export const GeneralForumCommentList = ({
  data,
  countComment,
  postId,
}: GeneralForumCommentListProps) => {
  // textField 관련 상태
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [textFieldMode, setTextFieldMode] = useState<
    'comment' | 'reply' | 'edit'
  >('comment')
  const [disabled, setDisabled] = useState(true)

  const inputRef = useRef<TextFieldAPI>(null)

  // 댓글 리스트 관련 상태
  const items = useMemo(() => {
    const base = flattenAndMarkMostLiked(data)
    return base.map(it => ({ ...it, isFocus: it.id === focusedId }))
  }, [data, focusedId])

  // 답글 생성 로직
  const handleCancelEdit = () => {
    setFocusedId(null)
    setTextFieldMode('comment')
  }

  const focusComment = (targetId: string) => {
    setFocusedId(targetId)
    requestAnimationFrame(() => {
      inputRef.current?.focus() // ✅ use the same ref
    })
  }

  const focusAndReply = (targetId: string) => {
    focusComment(targetId)
    setTextFieldMode('reply')
  }

  // 댓글 수정 로직
  const focusAndEdit = (targetId: string) => {
    focusComment(targetId)
    setTextFieldMode('edit')
  }

  // 댓글, 답글 삭제 로직
  const commentDeleteMutation = useCommentReplyMutation({
    commentId: focusedId ?? '',
    postId,
    mode: 'comment',
    method: 'delete',
    controllDisabled: setDisabled,
  })

  if (countComment === 0) return <NotComment />

  return (
    <>
      {items.map(item => (
        <Comment
          key={item.id}
          item={item}
          likeButton={
            <LikedButton
              liked={item.liked}
              likeCount={item.likeCount}
              commentId={item.id}
              postId={postId}
            />
          }
          sideButton={
            <CommentDropDown
              isMine={item.mine}
              onEdit={() => focusAndEdit(item.id)}
              onReply={() => focusAndReply(item.id)}
            />
          }
        />
      ))}
      <GeneralForumTextField
        mode={textFieldMode}
        ref={inputRef} // ✅ same unified ref here
        disabled={disabled}
        setDisabled={setDisabled}
        postId={postId}
        commentId={focusedId ?? ''}
        onCancelEdit={handleCancelEdit}
      />
    </>
  )
}

type LikedButtonProps = {
  liked: boolean
  likeCount: number
  commentId: string
  postId: string
}
const LikedButton = ({
  liked,
  likeCount,
  commentId,
  postId,
}: LikedButtonProps) => {
  const { handleLike } = useCommentLikeOptimistic(postId, commentId)
  return (
    <button className="flex items-center gap-1" onClick={handleLike}>
      <BlankHeart
        size={20}
        stroke="#636366"
        fill={liked ? '#636366' : 'none'}
      />
      {likeCount}
    </button>
  )
}

type CommentDropDownProps = {
  isMine: boolean
  onEdit?: () => void
  onReply?: () => void
  onReport?: () => void
  onDelete?: () => void
}

const CommentDropDown = ({
  isMine,
  onEdit,
  onReply,
  onReport,
  onDelete,
}: CommentDropDownProps) => {
  const dropdownMenuList = isMine
    ? [
        {
          label: '수정',
          value: 'edit',
          render: <Pencil size={16} stroke="#018381" />,
          onClick: onEdit ?? (() => console.log('수정')),
        },
        {
          label: '삭제',
          value: 'delete',
          render: <Trash size={16} stroke="#018381" />,
          onClick: onDelete ?? (() => console.log('삭제')),
        },
      ]
    : [
        {
          label: '답글',
          value: 'reply',
          render: <CommunicationDot size={16} stroke="#018381" />,
          onClick: onReply ?? (() => console.log('답글')),
        },
        {
          label: '신고',
          value: 'report',
          render: <TriangleWarning size={16} stroke="#018381" />,
          onClick: onReport ?? (() => console.log('신고')),
        },
      ]

  return (
    <DropDown
      data={dropdownMenuList}
      trigger={<MoreVertical size={16} stroke="#959598" />}
    />
  )
}
