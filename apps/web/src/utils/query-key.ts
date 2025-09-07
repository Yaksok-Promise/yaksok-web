//query key
export const QUERY_KEY = {
  MY_INFO: 'myInfo',
  COMMENT_LIST: 'commentList',
  GENERAL_FORUM: 'general-forum',
  MAGAZINE: 'magazine',
} as const

// QUERY_KEY의 value 유니온
export type QueryKeyHead = (typeof QUERY_KEY)[keyof typeof QUERY_KEY]

// "첫번째는 QueryKeyHead, 나머지는 string 0개 이상" 제약
export type AppointmentQueryKey = readonly [
  QueryKeyHead,
  ...(readonly string[]),
]

// 편하게 만드는 헬퍼(튜플 리터럴 보존 + 자동 추론)
export const makeQueryKey = <H extends QueryKeyHead>(
  head: H,
  ...rest: string[]
) => [head, ...rest] as const
