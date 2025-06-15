import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios'

import { CustomError } from '../type'

const BASE_API_URL = 'http://localhost:8101'

export const instance = axios.create({
  baseURL: BASE_API_URL,
})

instance.interceptors.request.use()

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const callbackSucess = (response: AxiosResponse<any, any>) => response

const callbackError = async (error: AxiosError<CustomError>) => {
  if (isAxiosError(error)) {
    // 토큰이 만료된 경우 토큰 갱신
    // 본래 요청에 대한 정보는 error.config에 담겨져 있습니다.

    const { response, config } = error
    console.error(error)

    if (response?.data.statusCode === 401) {
      const originalRequest = config!
      console.log(originalRequest)
    }

    error.message = error.response?.data?.message?.[0] as string
    return Promise.reject(error)
  }
  return Promise.reject(error)
}

instance.interceptors.response.use(callbackSucess, callbackError)
