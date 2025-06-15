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

  const urlWithParams = Object.entries(params).reduce((acc, values) => {
    const [key, value] = values
    return acc.replace(`{${key}}`, value)
  }, path)
  return queryString ? urlWithParams + '?' + queryString : urlWithParams
}
