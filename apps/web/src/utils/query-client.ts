import type { AppointmentQueryKey } from '@/utils/query-key'
import {
  type InferDataFromTag,
  type NoInfer,
  QueryClient,
  type SetDataOptions,
  type Updater,
} from '@tanstack/react-query'

export const getQueryData = <Res, K extends AppointmentQueryKey>(
  client: QueryClient,
  key: K
) => client.getQueryData<Res>(key)

/**
 *
 * - 값 또는 업데이터 함수를 모두 허용 (Updater)
 * - TInferredQueryFnData는 React Query의 InferDataFromTag 로 추론
 */
export function setQueryData<
  TQueryFnData = unknown,
  TTaggedQueryKey extends AppointmentQueryKey = AppointmentQueryKey,
  TInferredQueryFnData = InferDataFromTag<TQueryFnData, TTaggedQueryKey>,
>(
  client: QueryClient,
  queryKey: TTaggedQueryKey,
  updater: Updater<
    NoInfer<TInferredQueryFnData> | undefined,
    NoInfer<TInferredQueryFnData> | undefined
  >,
  options?: SetDataOptions
): NoInfer<TInferredQueryFnData> | undefined {
  return client.setQueryData<
    TQueryFnData,
    TTaggedQueryKey,
    TInferredQueryFnData
  >(queryKey, updater, options)
}

export const invalidateQueries = <K extends AppointmentQueryKey>(
  client: QueryClient,
  key: K
) => client.invalidateQueries({ queryKey: key })

export const cancelQueries = async <K extends AppointmentQueryKey>(
  client: QueryClient,
  key: K
) => await client.cancelQueries({ queryKey: key })
