import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from 'axios'

import { loginStore } from '@yaksok/store'
import { LOCAL_STORAGE_KEY, getItem, setItem } from '@yaksok/utils'
import { http } from '.'
import { CustomError } from '../type'
import { ReissueRequest, ReissueResponse } from '../type/user'

const isRNWebView =
  typeof window !== 'undefined' &&
  !!(window as Window & { ReactNativeWebView: unknown }).ReactNativeWebView

const ANDROID_EMULATOR = 'http://192.168.0.164:8080'
const BASE_API_URL = 'http://localhost:8080' // PC의 IP + 8101 (서버가 0.0.0.0로 바인딩되어야 함)

export const API_BASE = isRNWebView ? ANDROID_EMULATOR : BASE_API_URL

export const instance = axios.create({
  baseURL: API_BASE,
})

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const callbackSucess = (response: AxiosResponse<any, any>) => response

const useCallbackError = async (error: AxiosError<CustomError>) => {
  const { saveAccessToken, saveRefreshToken, refreshToken } =
    loginStore.getState()
  console.log(error, 'instance error')
  console.log(error?.response, 'instance error response')
  console.log(error?.config, 'instance error config')

  const RefreshToken = window.ReactNativeWebView
    ? refreshToken
    : getItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN)
  if (isAxiosError(error)) {
    // 토큰이 만료된 경우 토큰 갱신
    // 본래 요청에 대한 정보는 error.config에 담겨져 있습니다.

    const { response, config } = error
    console.error(error)

    if (response?.data.statusCode === 601) {
      //  토큰 reissue 요청
      const data = await http.post<ReissueRequest, ReissueResponse>(
        '/api/user/reissue',
        { body: { refreshToken: RefreshToken as string } }
      )

      if (data?.accessToken && data?.refreshToken) {
        saveAccessToken(data?.accessToken)
        saveRefreshToken(data?.refreshToken)
        setItem('accessToken', data.accessToken)
        setItem('refreshToken', data.refreshToken)

        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: 'REISSUE_TOKEN',
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
          })
        )

        config!.headers.Authorization = `Bearer ${data?.accessToken}`
        return instance(config as AxiosRequestConfig)
      }
    }
    // 리프레시 토큰 만료 602로 확인

    error.message = error.response?.data?.message?.[0] as string
    return Promise.reject(error)
  }
  return Promise.reject(error)
}

instance.interceptors.response.use(callbackSucess, useCallbackError)
