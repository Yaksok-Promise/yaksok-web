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

type PostContext<T> = { previous?: T }

/**
 * 공통 낙관적 좋아요 토글 훅
 * @param queryKey 쿼리 키
 * @param elementId 서버에 전송할 elementId (보통 상세 id)
 * @param target 'POST' | 'COMMENT'
 * @path target = like, magazine, general-forum
 */
function useOptimisticPost<T>(
  queryKey: AppointmentQueryKey,
  elementId: string,
  target: 'LIKE_POST' | 'LIKE_COMMENT' | 'MAGAZINE' | 'GENERAL_FORUM',

  customUpdater: (old: T | undefined) => T | undefined
) {
  const queryClient = useQueryClient()
  const token = useGetToken()
  const path =
    target === 'LIKE_POST' || target === 'LIKE_COMMENT'
      ? '/api/like/toggle'
      : target === 'MAGAZINE'
        ? '/api/post/magazine/{postId}/scrap'
        : '/api/post/general-forum/{postId}/scrap'

  const mutation = useHttpMutation<{}, CheckResultResponse, PostContext<T>>(
    path,
    'post',
    {
      headers: { Authorization: `Bearer ${token}` },
      query: {
        elementId,
        target: target === 'LIKE_POST' ? 'POST' : 'COMMENT',
      },
      params: {
        postId: elementId,
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

  const handleOptimisticPost = useCallback(() => {
    mutation.mutate({})
  }, [mutation])

  return { handleOptimisticPost, mutation }
}

// magazine
export const useMagazineLikeOptimistic = (magazineId: string) => {
  return useOptimisticPost<MagazineDetail>(
    [QUERY_KEY.MAGAZINE, magazineId],
    magazineId,
    'LIKE_POST',
    updateMagazineLikeOptimistic
  )
}

// general-forum
export const useGeneralForumLikeOptimistic = (forumId: string) => {
  return useOptimisticPost<GeneralForumDetail>(
    [QUERY_KEY.GENERAL_FORUM, forumId],
    forumId,
    'LIKE_POST',
    updateMagazineLikeOptimistic
  )
}

// commentList
export const useCommentLikeOptimistic = (postId: string, commentId: string) => {
  const customUpdater = (old: CommentResponse | undefined) =>
    updateCommentListOptimisticByElementId(old, commentId)

  return useOptimisticPost<CommentResponse>(
    [QUERY_KEY.COMMENT_LIST, postId],
    commentId,
    'LIKE_COMMENT',
    customUpdater
  )
}

// scrapCount

// magazine
export const useMagazineScrapCountOptimistic = (magazineId: string) => {
  return useOptimisticPost<MagazineDetail>(
    [QUERY_KEY.MAGAZINE, magazineId],
    magazineId,
    'MAGAZINE',
    updataeScrapCount
  )
}

// general-forum
export const useGeneralForumScrapCountOptimistic = (forumId: string) => {
  return useOptimisticPost<GeneralForumDetail>(
    [QUERY_KEY.GENERAL_FORUM, forumId],
    forumId,
    'GENERAL_FORUM',
    updataeScrapCount
  )
}

// updater 수정 필요
function updataeScrapCount<T extends MagazineDetail | GeneralForumDetail>(
  magazineData: T | undefined
): T | undefined {
  if (!magazineData) return magazineData
  // 스크랩 여부 데이터 필요
  const nextScraped = !magazineData.liked
  const delta = nextScraped ? 1 : -1
  return {
    ...magazineData,
    scraped: nextScraped,
    scrapCount: Math.max(0, ((magazineData.scrapCount as number) ?? 0) + delta),
  }
}
