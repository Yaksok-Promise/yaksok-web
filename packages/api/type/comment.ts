import { Pagination } from './pagination'

// comment type
export type Reply = {
  childCommentId: string
  createdAt: string
  authorProfileImageUrl: string
  author: string
  content: string
  likeCount: number
  liked: boolean
  mine: boolean
}

export type Comment = {
  parentCommentId: string
  authorProfileImageUrl: string
  author: string
  createdAt: string
  content: string
  replies: Reply[]
  liked: boolean
  mine: boolean
  likeCount: number
}

export type MimeImage =
  | 'image/apng'
  | 'image/avif'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/png'
  | 'image|svg+xml'
  | 'image/webp'

export type Tag = {
  id: string
  name: string
}

// comment requset type
export type CommentRequest = {
  content: string
}

//comment response type
export type CommentResponse = Comment[]

export type ToggleRequest = {
  elementId: string
  target: 'POST' | 'COMMENT'
}
