import { QUERY_KEY } from '@/utils/query-key'
import { UserInfoResponse } from '@yaksok/api/userType'
import { useGetToken } from '../use-get-token'
import { useUpdateToken } from '../use-update-token'
import { useHttpQuery } from './use-http-query'

export default function useGetMyInfo() {
  useUpdateToken()
  const token = useGetToken()

  const userinfo = useHttpQuery<undefined, UserInfoResponse>(
    [QUERY_KEY.MY_INFO],
    '/api/user/info',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return userinfo
}
