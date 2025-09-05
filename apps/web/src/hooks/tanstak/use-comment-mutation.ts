import { PathType, UrlOption } from '@yaksok/api'
import { useGetToken } from '../use-get-token'
import { useHttpMutation } from './use-http-mutation'
import { CommentRequest, CommentResponse } from '@yaksok/api/commentType'
import { useQueryClient } from '@tanstack/react-query'
import { AppointmentQueryKey, QUERY_KEY } from '@/utils/query-key'
import {
  cancelQueries,
  getQueryData,
  invalidateQueries,
  setQueryData,
} from '@/utils/query-client'

type CommentUpdater = (
  old: CommentResponse | undefined
) => CommentResponse | undefined

export type CommentReplyRequest = {
  commentId: string
  postId: string
  mode: 'comment' | 'reply'
  method: 'post' | 'patch' | 'delete'
  controllDisabled: (isDisabled: boolean) => void
  updater?: CommentUpdater
}

type CommentReplyContext = { previous?: CommentResponse }

export const useCommentReplyMutation = ({
  commentId,
  postId,
  mode,
  controllDisabled,
  updater,
  method = 'post',
}: CommentReplyRequest) => {
  const token = useGetToken()
  const queryClient = useQueryClient()
  const queryKey: AppointmentQueryKey = [QUERY_KEY.COMMENT_LIST, postId]

  let path: PathType = '/api/comment/{commentId}'
  let params: UrlOption['params'] = {
    commentId,
  }

  // 답글 작성시 메서드 option 변경
  if (mode === 'reply' && method === 'post') {
    path = '/api/comment/{parentCommentId}/reply'
    params = {
      parentCommentId: commentId,
    }
  }

  return useHttpMutation<CommentRequest, undefined, CommentReplyContext>(
    path,
    method,
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
    {
      onMutate: async () => {
        controllDisabled(true)
        await cancelQueries(queryClient, queryKey)

        const previous = getQueryData<CommentResponse, AppointmentQueryKey>(
          queryClient,
          queryKey
        )

        if (updater) {
          setQueryData<CommentResponse, AppointmentQueryKey>(
            queryClient,
            queryKey,
            updater
          )
        }

        return { previous }
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.previous) {
          setQueryData<CommentResponse, AppointmentQueryKey>(
            queryClient,
            queryKey,
            ctx.previous
          )
        }
      },
      onSettled: () => {
        invalidateQueries(queryClient, queryKey)
        controllDisabled(false)
      },
    }
  )
}

// patch

type EditDeleteCommentMutationRequest = Omit<
  CommentReplyRequest,
  'mode' | 'method' | 'updater'
> & { content: string }
export const useEditCommentMuntation = ({
  content,
  commentId,
  postId,
  controllDisabled,
}: EditDeleteCommentMutationRequest) => {
  const updater: CommentUpdater = old => {
    if (!Array.isArray(old) || old.length === 0) return old

    const newCommentData = old.map(comment => {
      if (comment.parentCommentId === commentId) {
        return {
          ...comment,
          content,
        }
      }

      const newReplies = comment.replies.map(reply => {
        if (reply.childCommentId === commentId) {
          return {
            ...reply,
            content,
          }
        }
        return reply
      })
      return {
        ...comment,
        replies: newReplies,
      }
    })
    return newCommentData
  }

  return useCommentReplyMutation({
    commentId,
    postId,
    mode: 'comment',
    method: 'patch',
    controllDisabled,
    updater,
  })
}

// delete
export const useDeleteCommentMuntation = ({
  commentId,
  postId,
  controllDisabled,
}: EditDeleteCommentMutationRequest) => {
  const updater: CommentUpdater = old => {
    if (!Array.isArray(old) || old.length === 0) return old

    const newCommentData = old.map(comment => {
      if (comment.parentCommentId === commentId) {
        return {
          ...comment,
          author: '',
          authorProfileImageUrl: '',
          content: '삭제된 댓글입니다.',
        }
      }

      const newReplies = comment.replies.map(reply => {
        if (reply.childCommentId === commentId) {
          return {
            ...reply,
            author: '',
            authorProfileImageUrl: '',
            content: '삭제된 댓글입니다.',
          }
        }
        return reply
      })

      return {
        ...comment,
        replies: newReplies,
      }
    })
    return newCommentData
  }

  return useCommentReplyMutation({
    commentId,
    postId,
    mode: 'comment',
    method: 'delete',
    controllDisabled,
    updater,
  })
}
