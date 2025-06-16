type ParamsName = 'postId' | 'parentCommentId' | 'commentId'
type Params = Record<ParamsName, string> | {}
type Queries = Record<string, string>

export type UrlOption = {
  params?: Params
  query?: Queries
}

export const makePath = (
  path: string,
  { params = {}, query = {} }: UrlOption
): string => {
  const queryString = new URLSearchParams(query).toString()

  const urlWithParams = Object.entries(params).reduce((acc, [key, value]) => {
    // 모든 {key} 패턴을 전역 치환
    const regex = new RegExp(`{${key}}`, 'g')
    return acc.replace(regex, value)
  }, path)

  return queryString ? `${urlWithParams}?${queryString}` : urlWithParams
}
