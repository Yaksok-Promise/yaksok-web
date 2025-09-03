import { Pagination } from './pagination'

// comment type
export type Reply = {
  childCommentId: string
  author: string
  content: string
}

export type Comment = {
  parentCommentId: string
  author: string
  content: string
  replies: Reply[]
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

export type ForumImage = {
  id: number
  url: string
  thumbnailUrl: string
  originalName: string
  mimeType: MimeImage
}

export type GeneralForum = {
  id: string
  title: string
  body: string
  author: string
  createdAt: string
  images: ForumImage[]
  likes: number
  views: number
  liked: boolean
  mine: boolean
}

// comment requset type
export type CommentRequest = {
  content: string
}

//comment response type
export type CommentResponse = Comment[]

export type GeneralForumListResponse = Pagination & {
  content: Omit<GeneralForum, 'liked' | 'mine'> &
    {
      tag: Tag[]
      commentCount: number
    }[]
}

export type ToggleRequest = {
  elementId: string
  target: 'POST' | 'COMMENT'
}
