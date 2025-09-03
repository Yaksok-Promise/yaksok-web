import { QUERY_KEY } from '@/utils/query-key'
import { UserInfoResponse } from '@yaksok/api/userType'
import { useHttpQuery } from './use-http-query'
import { useUpdateToken } from '../use-update-token'
import { useGetToken } from '../use-get-token'

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
