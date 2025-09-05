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

export type GeneralForrumCommentListProps = {
  data: CommentResponse
  countComment: number
  postId: string
}

export const GeneralForrumCommentList = ({
  data,
  countComment,
  postId,
}: GeneralForrumCommentListProps) => {
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [textFieldMode, setTextFieldMode] = useState<'comment' | 'reply'>(
    'comment'
  )

  const [disabled, setDisabled] = useState(true)

  // ✅ Single unified ref (focus/clear/getValue + DOM via .el)
  const inputRef = useRef<TextFieldAPI>(null)

  const items = useMemo(() => {
    const base = flattenAndMarkMostLiked(data)
    return base.map(it => ({ ...it, isFocus: it.id === focusedId }))
  }, [data, focusedId])

  const handleCancelEdit = () => {
    setFocusedId(null)
    setTextFieldMode('comment')
  }

  const focusAndReply = (targetId: string) => {
    setFocusedId(targetId)
    setTextFieldMode('reply')
    requestAnimationFrame(() => {
      inputRef.current?.focus() // ✅ use the same ref
    })
  }

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
              onEdit={() => focusAndReply(item.id)}
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
