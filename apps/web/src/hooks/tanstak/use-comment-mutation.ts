import {
  cancelQueries,
  getQueryData,
  invalidateQueries,
  setQueryData,
} from '@/utils/query-client'
import { AppointmentQueryKey, QUERY_KEY } from '@/utils/query-key'
import { useQueryClient } from '@tanstack/react-query'
import { PathType, UrlOption } from '@yaksok/api'
import { CommentRequest, CommentResponse } from '@yaksok/api/commentType'
import { useGetToken } from '../use-get-token'
import { useHttpMutation } from './use-http-mutation'

export type CommentReplyRequest = {
  commentId: string
  postId: string
  mode?: 'comment' | 'reply'
  method?: 'post' | 'patch' | 'delete'
}

type CommentReplyContext = { previous?: CommentResponse }

export const useCommentReplyMutation = ({
  commentId,
  postId,
  mode = 'comment',
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

  return useHttpMutation<
    CommentRequest | undefined,
    undefined,
    CommentReplyContext
  >(
    path,
    method,
    {
      headers: { Authorization: `Bearer ${token}` },
      params,
    },
    {
      onMutate: async value => {
        await cancelQueries(queryClient, queryKey)

        const previous = getQueryData<CommentResponse, AppointmentQueryKey>(
          queryClient,
          queryKey
        )

        // 댓글 수정
        if (method === 'patch') {
          setQueryData<CommentResponse, AppointmentQueryKey>(
            queryClient,
            queryKey,
            old => {
              if (!Array.isArray(old) || old.length === 0) return old

              const newCommentData = old.map(comment => {
                if (comment.parentCommentId === commentId) {
                  return {
                    ...comment,
                    content: value?.content as string,
                  }
                }

                const newReplies = comment.replies.map(reply => {
                  if (reply.childCommentId === commentId) {
                    return {
                      ...reply,
                      content: value?.content as string,
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
          )
        }

        if (method === 'delete') {
          setQueryData<CommentResponse, AppointmentQueryKey>(
            queryClient,
            queryKey,
            old => {
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
      },
    }
  )
}
