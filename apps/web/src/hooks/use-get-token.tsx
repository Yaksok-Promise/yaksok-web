import { useLoginStore } from '@yaksok/store'
import { LOCAL_STORAGE_KEY, getItem } from '@yaksok/utils'

export function useGetToken() {
  const { accessToken } = useLoginStore()

  return window.ReactNativeWebView
    ? accessToken
    : (getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) as string)
}
