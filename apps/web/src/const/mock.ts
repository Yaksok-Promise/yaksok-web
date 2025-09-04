import { Comment, CommentResponse } from '@yaksok/api/commentType'

export const mockCommentList = [
  {
    parentCommentId: 'a26b9675-ba66-4c27-ad1d-651a80f8ee54',
    author: null,
    authorProfileImageUrl: null,
    content: '삭제된 댓글입니다.',
    createdAt: '2025-09-03T23:20:00Z',
    liked: false,
    mine: false,
    likeCount: 0,
    replies: [
      {
        childCommentId: 'ae7844ef-afc4-4d0d-a491-4195a566ab28',
        author: '더러운 무',
        authorProfileImageUrl: 'https://cdn.example.com/u/dirty-radish.png',
        content: '대댓글 내용입니다.',
        createdAt: '2025-09-03T23:25:00Z',
        liked: false,
        mine: false,
        likeCount: 1,
      },
      {
        childCommentId: 'b7a2b6a9-2a5e-4c22-9d1d-1234567890ab',
        author: '밝은 당근',
        authorProfileImageUrl: 'https://cdn.example.com/u/bright-carrot.png',
        content: '두 번째 대댓글입니다.',
        createdAt: '2025-09-03T23:26:00Z',
        liked: false,
        mine: false,
        likeCount: 2,
      },
    ],
  },
  {
    parentCommentId: 'c3bf2c11-0d1b-4a0f-8d1e-abcdef123456',
    author: '초록 상추',
    authorProfileImageUrl: 'https://cdn.example.com/u/green-lettuce.png',
    content: '두 번째 댓글입니다.',
    createdAt: '2025-09-04T00:10:00Z',
    liked: false,
    mine: false,
    likeCount: 2,
    replies: [],
  },
] as Comment[]
