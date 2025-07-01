const users = [
  '/api/user/signup',
  '/api/user/reset/password',
  '/api/user/login',
  '/api/user/find/id',
  '/api/user/change/password',
  '/api/user/info',
  '/api/user/check/nickname',
  '/api/user/check/id',
] as const

const sms = ['/api/sms/verify', '/api/sms/test/code', '/api/sms/code'] as const

const comments = [
  '/api/comment/{postId}',
  '/api/comment/{parentCommentId}/reply',
  '/api/comment/{commentId}',
  '/api/comment/list',
] as const

export const pathList = [...users, ...comments, ...sms]

export type PathType = (typeof pathList)[number]
