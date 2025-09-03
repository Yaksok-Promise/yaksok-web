import { useLoginStore } from '@yaksok/store'
import { getItem, LOCAL_STORAGE_KEY } from '@yaksok/utils'

export function useGetToken() {
  const { accessToken } = useLoginStore()

  return window.ReactNativeWebView
    ? accessToken
    : (getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) as string)
}
