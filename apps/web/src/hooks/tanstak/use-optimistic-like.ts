import {
  cancelQueries,
  getQueryData,
  invalidateQueries,
  setQueryData,
} from '@/utils/query-client'
import { AppointmentQueryKey } from '@/utils/query-key'
import { useQueryClient } from '@tanstack/react-query'
import {
  GeneralForumDetail,
  MagazineDetail,
} from '@yaksok/api/boardMagazineType'
import { CheckResultResponse } from '@yaksok/api/userType'
import { useCallback } from 'react'
import { useGetToken } from '../use-get-token'
import { useHttpMutation } from './use-http-mutation'

type Likeable = {
  liked: boolean
  likes?: number | null
}

type LikeContext<T> = {
  previous?: T
}

/**
 * 공통 낙관적 좋아요 토글 훅
 * @param scope 쿼리 키 prefix (예: 'magazine', 'general-forum')
 * @param elementId 서버에 전송할 elementId (보통 상세 id)
 * @param target 'POST' | 'COMMENT'
 */
export function useOptimisticLike<T extends Likeable>(
  scope: 'magazine' | 'general-forum',
  elementId: string,
  target: 'POST' | 'COMMENT'
) {
  const queryClient = useQueryClient()
  const token = useGetToken()
  const queryKey = [scope, elementId] as const

  const mutation = useHttpMutation<
    undefined,
    CheckResultResponse,
    LikeContext<T>
  >(
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

        setQueryData<T, AppointmentQueryKey>(queryClient, queryKey, old => {
          if (!old) return old
          const nextLiked = !old.liked
          const delta = nextLiked ? 1 : -1
          return {
            ...old,
            liked: nextLiked,
            likes: Math.max(0, (old.likes ?? 0) + delta),
          }
        })

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
    mutation.mutate(undefined)
  }, [mutation])

  return { handleLike, mutation }
}

// magazine
export const useMagazineLikeOptimistic = (
  magazineId: string,
  target: 'POST' | 'COMMENT'
) => useOptimisticLike<MagazineDetail>('magazine', magazineId, target)

// general-forum
export const useGeneralForumLikeOptimistic = (
  forumId: string,
  target: 'POST' | 'COMMENT'
) => useOptimisticLike<GeneralForumDetail>('general-forum', forumId, target)
