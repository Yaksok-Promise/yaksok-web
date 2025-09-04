import { Comment } from '@yaksok/api/commentType'
import { FlatItem } from '@yaksok/ui'

export function flattenAndMarkMostLiked(
  data: Comment[] | null | undefined
): FlatItem[] {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const items: FlatItem[] = []

  // 최대값 추적용
  let max = -Infinity
  let maxIdx = -1
  let hasDuplicateMax = false

  const consider = (idx: number, likeCount: number) => {
    if (likeCount > max) {
      max = likeCount
      maxIdx = idx
      hasDuplicateMax = false
    } else if (likeCount === max) {
      hasDuplicateMax = true
    }
  }

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
      isMostLiked: false,
    }
    items.push(baseComment)
    consider(items.length - 1, baseComment.likeCount)

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
        isMostLiked: false,
      }
      items.push(flatReply)
      consider(items.length - 1, flatReply.likeCount)
    }
  }

  // ✅ 고유 최대값일 때만 true로 마킹
  if (maxIdx !== -1 && !hasDuplicateMax) {
    items[maxIdx].isMostLiked = true
  }

  // 동점이면 아무도 most가 아님
  return items
}
