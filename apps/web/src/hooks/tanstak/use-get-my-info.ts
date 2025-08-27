import { QUERY_KEY } from '@/utils/query-key'
import { UserInfoResponse } from '@yaksok/api/userType'
import { useLoginStore } from '@yaksok/store'
import { LOCAL_STORAGE_KEY, getItem } from '@yaksok/utils'
import { useGetToken } from '../use-get-token'
import { useHttpQuery } from './use-http-query'

export default function useGetMyInfo() {
  useGetToken()
  const { accessToken } = useLoginStore()

  const userinfo = useHttpQuery<undefined, UserInfoResponse>(
    [QUERY_KEY.MY_INFO],
    '/api/user/info',
    {
      headers: {
        Authorization: `Bearer ${window.ReactNativeWebView ? accessToken : getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
      },
    }
  )
  return userinfo
}
