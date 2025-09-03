import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useHttpMutation } from './use-http-mutation'
import { CheckResultResponse } from '@yaksok/api/userType'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'
import { useGetToken } from '../use-get-token'

type LikeContext = {
  previous?: MagazineDetail
}

export const useMagazineLikeOptimistic = (
  magazineId: string,
  target: 'POST' | 'COMMENT'
) => {
  const queryClient = useQueryClient()
  const token = useGetToken()

  const mutation = useHttpMutation<undefined, CheckResultResponse, LikeContext>(
    '/api/like/toggle',
    'post',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        elementId: magazineId,
        target,
      },
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['magazine', magazineId] })

        const previous = queryClient.getQueryData<MagazineDetail>([
          'magazine',
          magazineId,
        ])

        queryClient.setQueryData<MagazineDetail>(
          ['magazine', magazineId],
          old => {
            if (!old) return old
            const nextLiked = !old.liked
            const delta = nextLiked ? 1 : -1
            return {
              ...old,
              liked: nextLiked,
              likes: Math.max(0, (old.likes ?? 0) + delta),
            }
          }
        )

        return { previous }
      },
      onError: (_err, _vars, ctx) => {
        if (ctx?.previous) {
          queryClient.setQueryData(['magazine', magazineId], ctx.previous)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['magazine', magazineId] })
      },
    }
  )

  const handleLike = useCallback(() => {
    mutation.mutate(undefined)
  }, [mutation])

  return { handleLike }
}
