import { useCommentLikeOptimistic } from '@/hooks/tanstak/use-optimistic-like'
import { flattenAndMarkMostLiked } from '@/utils/change-comment-list-optimistic'
import { CommentResponse } from '@yaksok/api/commentType'
import { BlankHeart } from '@yaksok/icons'
import { NotComment, Comment } from '@yaksok/ui'

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
  console.log('items Flattened', items)
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
