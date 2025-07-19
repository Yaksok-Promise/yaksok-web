import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios'

import { CustomError } from '../type'

const BASE_API_URL = 'http://localhost:8080'

export const instance = axios.create({
  baseURL: BASE_API_URL,
})

instance.interceptors.request.use()

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const callbackSucess = (response: AxiosResponse<any, any>) => response

const callbackError = async (error: AxiosError<CustomError>) => {
  if (isAxiosError(error)) {
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
