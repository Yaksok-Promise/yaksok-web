import { useCommentLikeOptimistic } from '@/hooks/tanstak/use-optimistic-like'
import { flattenAndMarkMostLiked } from '@/utils/change-comment-list-optimistic'
import { CommentResponse } from '@yaksok/api/commentType'
import {
  BlankHeart,
  CommunicationDot,
  TriangleWarning,
  Trash,
  Pencil,
  MoreVertical,
} from '@yaksok/icons'
import { NotComment, Comment, DropDown } from '@yaksok/ui'

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
  if (countComment === 0) {
    return <NotComment />
  }
  const items = flattenAndMarkMostLiked(data)

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
          sideButton={<CommentDropDown isMine={item.mine} />}
        />
      ))}
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
}
const CommentDropDown = ({ isMine }: CommentDropDownProps) => {
  const dropdownMenuList = isMine
    ? [
        {
          label: '수정',
          value: 'edit',
          render: <Pencil size={16} stroke="#018381" />,
          onClick: () => {
            alert('수정')
          },
        },
        {
          label: '삭제',
          value: 'delete',
          render: <Trash size={16} stroke="#018381" />,
          onClick: () => {
            alert('삭제')
          },
        },
      ]
    : [
        {
          label: '답글',
          value: 'reply',
          render: <CommunicationDot size={16} stroke="#018381" />,
          onClick: () => {
            alert('답글')
          },
        },
        {
          label: '신고',
          value: 'report',
          render: <TriangleWarning size={16} stroke="#018381" />,
          onClick: () => {
            alert('신고')
          },
        },
      ]
  return (
    <DropDown
      data={dropdownMenuList}
      trigger={<MoreVertical size={16} stroke="#959598" />}
    />
  )
}
