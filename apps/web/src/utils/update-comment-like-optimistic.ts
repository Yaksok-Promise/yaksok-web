import { CommentResponse } from '@yaksok/api/commentType'

export function updateCommentListOptimisticByElementId(
  commentData: CommentResponse | undefined,
  elementId: string
): CommentResponse | undefined {
  if (!Array.isArray(commentData) || commentData.length === 0)
    return commentData

  let updated = false

  const newData = commentData.map(comment => {
    if (updated) return comment

    // 1) 부모 댓글 매칭
    if (comment.parentCommentId === elementId) {
      updated = true
      const nextLiked = !comment.liked
      const delta = nextLiked ? 1 : -1
      return {
        ...comment,
        liked: nextLiked,
        likeCount: Math.max(0, (comment.likeCount ?? 0) + delta),
      }
    }

    // 2) 대댓글 매칭
    let replyTouched = false
    const nextReplies = comment.replies.map(reply => {
      if (replyTouched || reply.childCommentId !== elementId) return reply
      replyTouched = true
      const nextLiked = !reply.liked
      const delta = nextLiked ? 1 : -1
      return {
        ...reply,
        liked: nextLiked,
        likeCount: Math.max(0, (reply.likeCount ?? 0) + delta),
      }
    })

    if (replyTouched) {
      updated = true
      return { ...comment, replies: nextReplies }
    }

    return comment
  })

  return updated ? newData : commentData
}
