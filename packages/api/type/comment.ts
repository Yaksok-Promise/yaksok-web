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

// comment requset type
export type CommentRequest = {
  content: string
}

//comment response type
export type CommentResponse = Comment[]
