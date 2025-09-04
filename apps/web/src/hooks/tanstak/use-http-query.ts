import { AppointmentQueryKey } from '@/utils/query-key'
import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { http, PathType, RequestOption } from '@yaksok/api'

export const useHttpQuery = <
  Body = undefined,
  Res = unknown,
  TQueryKey extends AppointmentQueryKey = AppointmentQueryKey,
>(
  queryKey: TQueryKey,
  path: PathType,
  option: RequestOption<Body>,
  queryOptions?: Omit<
    UseQueryOptions<Res, unknown, Res, TQueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  return useSuspenseQuery({
    queryKey,
    queryFn: async () => {
      return http.get<Body, Res>(path, option)
    },
    ...queryOptions,
  })
}
