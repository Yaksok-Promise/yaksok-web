import { AxiosRequestConfig } from 'axios'
import { type PathType, type UrlOption, makePath } from '../path'
import { instance } from './instance'

export type RequestOption<T> = UrlOption &
  AxiosRequestConfig & {
    body?: T
  }

const get = async <BODY, RES>(
  path: PathType,
  option: RequestOption<BODY>
): Promise<RES> => {
  const { params, query } = option
  const url = makePath(path, { params, query })

  const result = await instance.get<RES>(url, { ...option })

  return result.data
}

const post = async <BODY, RES>(
  path: PathType,
  { params, query, body, ...props }: RequestOption<BODY>
): Promise<RES> => {
  const url = makePath(path, { params, query })

  const result = await instance.post<RES>(url, body, { ...props })

  return result.data
}

const _delete = async <BODY, RES>(
  path: PathType,
  { params, query, ...props }: RequestOption<BODY>
): Promise<RES> => {
  const url = makePath(path, { params, query })

  const result = await instance.delete<RES>(url, props)

  return result.data
}

export const http = {
  get,
  post,
  delete: _delete,
}
