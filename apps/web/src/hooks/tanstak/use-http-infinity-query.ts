import { InfiniteData, QueryKey } from '@tanstack/react-query'
import {
  UseSuspenseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryResult,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query'
import { http, PathType, RequestOption } from '@yaksok/api'
import { Pagination } from '@yaksok/api/paginationType'

/** 서버 공통 페이지 응답 */
export type Paginated<T> = Pagination & { content: T[] }

/** 페이지 파라미터(숫자 페이지 기반) */
type PageParam = number

type BaseInfiniteOptions<TItem, TQueryKey extends QueryKey> = Omit<
  UseSuspenseInfiniteQueryOptions<
    Paginated<TItem>,
    unknown,
    InfiniteData<Paginated<TItem>, PageParam>,
    Paginated<TItem>,
    TQueryKey,
    PageParam
  >,
  | 'queryKey'
  | 'queryFn'
  | 'initialPageParam'
  | 'getNextPageParam'
  | 'getPreviousPageParam'
>

export function useHttpInfiniteQuery<
  Body = undefined,
  TItem = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  path: PathType,
  option: RequestOption<Body>,
  queryOptions?: BaseInfiniteOptions<TItem, TQueryKey> & {
    initialPage?: number
    pageSize?: number
  }
): UseSuspenseInfiniteQueryResult<
  InfiniteData<Paginated<TItem>, PageParam>,
  unknown
> & {
  items: TItem[]
} {
  const initialPage = queryOptions?.initialPage ?? 0

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const optSize = (option as any)?.params?.size
  const numericOptSize =
    typeof optSize === 'number'
      ? optSize
      : typeof optSize === 'string'
        ? Number(optSize)
        : undefined

  const pageSize =
    numericOptSize && !Number.isNaN(numericOptSize) && numericOptSize > 0
      ? numericOptSize
      : (queryOptions?.pageSize ?? 20)

  const result = useSuspenseInfiniteQuery<
    Paginated<TItem>, // TQueryFnData
    unknown, // TError
    InfiniteData<Paginated<TItem>, PageParam>, // TData
    TQueryKey, // TQueryKey
    PageParam // TPageParam
  >({
    queryKey,
    initialPageParam: initialPage,
    queryFn: async ({ pageParam }) => {
      const mergedOption: RequestOption<Body> = {
        ...option,
        params: {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          ...(option as any)?.params,
          page: pageParam,
          size: pageSize,
        },
      }
      return http.get<Body, Paginated<TItem>>(path, mergedOption)
    },
    getNextPageParam: (
      lastPage /*, allPages, lastPageParam, allPageParams */
    ) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    getPreviousPageParam: (
      firstPage /*, allPages, firstPageParam, allPageParams */
    ) => (firstPage.first ? undefined : Math.max(firstPage.page - 1, 0)),

    ...queryOptions,
  })

  const items = result.data?.pages.flatMap(p => p.content ?? []) ?? []

  return {
    ...result,
    items,
  }
}
