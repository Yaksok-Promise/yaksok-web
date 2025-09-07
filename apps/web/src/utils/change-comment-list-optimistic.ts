import { Comment } from '@yaksok/api/commentType'
import { FlatItem } from '@yaksok/ui'

export function flattenAndMarkMostLiked(
  data: Comment[] | null | undefined
): FlatItem[] {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const items: FlatItem[] = []

  // 1회 순회: 평탄화 + 최대값/중복 동시 계산
  for (const comment of data) {
    const baseComment: FlatItem = {
      mode: 'comment',
      id: comment.parentCommentId,
      author: comment.author,
      authorProfileImageUrl: comment.authorProfileImageUrl,
      content: comment.content,
      likeCount: comment.likeCount,
      liked: comment.liked,
      createdAt: comment.createdAt,
      mine: comment.mine,
      isFocus: false,
    }
    items.push(baseComment)

    const replies = Array.isArray(comment.replies) ? comment.replies : []
    for (const reply of replies) {
      const flatReply: FlatItem = {
        mode: 'reply',
        id: reply.childCommentId,
        createdAt: reply.createdAt,
        authorProfileImageUrl: reply.authorProfileImageUrl,
        parentId: comment.parentCommentId,
        author: reply.author,
        content: reply.content,
        likeCount: reply.likeCount,
        liked: reply.liked,
        mine: reply.mine,
        isFocus: false,
      }
      items.push(flatReply)
    }
  }

  // 동점이면 아무도 most가 아님
  return items
}
