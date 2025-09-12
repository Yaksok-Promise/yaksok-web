import {
  cancelQueries,
  getQueryData,
  invalidateQueries,
  setQueryData,
} from '@/utils/query-client'
import { AppointmentQueryKey, QUERY_KEY } from '@/utils/query-key'
import { updateMagazineLikeOptimistic } from '@/utils/upadate-magazine-like-optimistic'
import { updateCommentListOptimisticByElementId } from '@/utils/update-comment-like-optimistic'
import { useQueryClient } from '@tanstack/react-query'
import {
  GeneralForumDetail,
  MagazineDetail,
} from '@yaksok/api/boardMagazineType'
import { CommentResponse } from '@yaksok/api/commentType'
import { CheckResultResponse } from '@yaksok/api/userType'
import { useCallback } from 'react'
import { useGetToken } from '../use-get-token'
import { useHttpMutation } from './use-http-mutation'

type LikeContext<T> = { previous?: T }

/**
 * 공통 낙관적 좋아요 토글 훅
 * @param queryKey 쿼리 키
 * @param elementId 서버에 전송할 elementId (보통 상세 id)
 * @param target 'POST' | 'COMMENT'
 */
function useOptimisticLikeList<T>(
  queryKey: AppointmentQueryKey,
  elementId: string,
  target: 'POST' | 'COMMENT',
  customUpdater: (old: T | undefined) => T | undefined
) {
  const queryClient = useQueryClient()
  const token = useGetToken()

  const mutation = useHttpMutation<{}, CheckResultResponse, LikeContext<T>>(
    '/api/like/toggle',
    'post',
    {
      headers: { Authorization: `Bearer ${token}` },
      query: {
        elementId,
        target,
      },
    },
    {
      onMutate: async () => {
        await cancelQueries(queryClient, queryKey)

        const previous = getQueryData<T, AppointmentQueryKey>(
          queryClient,
          queryKey
        )

        setQueryData<T, AppointmentQueryKey>(
          queryClient,
          queryKey,
          customUpdater
        )

        return { previous }
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.previous) {
          setQueryData<T, AppointmentQueryKey>(
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

  const handleLike = useCallback(() => {
    mutation.mutate({})
  }, [mutation])

  return { handleLike, mutation }
}

// magazine
export const useMagazineLikeListOptimistic = (magazineId: string) => {
  return useOptimisticLikeList<MagazineDetail>(
    [QUERY_KEY.MAGAZINE],
    magazineId,
    'POST'
    // customUpdater 필요
  )
}

// general-forum
export const useGeneralForumLikeListOptimistic = (forumId: string) => {
  return useOptimisticLikeList<GeneralForumDetail>(
    [QUERY_KEY.GENERAL_FORUM],
    forumId,
    'POST'
    // customUpdater 필요
  )
}
