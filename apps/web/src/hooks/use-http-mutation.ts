import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { http, PathType, RequestOption } from '@yaksok/api'

export const useHttpMutation = <
  Body = unknown,
  Res = unknown,
  Context = unknown,
>(
  path: PathType,
  method: 'post' | 'delete' | 'patch' = 'post',
  baseOption?: Omit<RequestOption<Body>, 'data'>,
  // Context는 낙관적 업데이트 시 onMutate에서 반환하는 임시값을 의미합니다.
  mutationOptions?: UseMutationOptions<Res, unknown, Body, Context>
) => {
  return useMutation<Res, unknown, Body, Context>({
    mutationFn: async (body: Body) => {
      if (method === 'post') {
        return http.post<Body, Res>(path, { ...baseOption, body })
      } else {
        return http.delete<Body, Res>(path, { ...baseOption, body })
      }
    },
    ...mutationOptions,
  })
}
