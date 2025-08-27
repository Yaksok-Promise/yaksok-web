const users = [
  '/api/user/signup',
  '/api/user/reset/password',
  '/api/user/login',
  '/api/user/find/id',
  '/api/user/change/password',
  '/api/user/change/nickname',
  '/api/user/info',
  '/api/user/check/nickname',
  '/api/user/check/id',
  '/api/user/reset/password',
  '/api/user/reissue',
  '/api/user/check/nickname',
  '/api/user/check/id',
] as const

const sms = ['/api/sms/verify', '/api/sms/test/code', '/api/sms/code'] as const

const comments = [
  '/api/comment/{postId}',
  '/api/comment/{parentCommentId}/reply',
  '/api/comment/{commentId}',
  '/api/comment/list',
  '/api/like/toggle',
] as const

const boardAndMagazine = [
  '/api/post/magazine/create',
  '/api/post/magazine/list',
  '/api/post/magazine/{postId}',
  '/api/post/general-forum/create',
  '/api/post/general-forum/list',
  '/api/post/general-forum/{postId}',
  '/api/post/general-forum/my',
] as const
export const pathList = [...users, ...comments, ...sms, ...boardAndMagazine]

export type PathType = (typeof pathList)[number]
