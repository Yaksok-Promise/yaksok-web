import { MoreVertical, ReplyArrow } from '@yaksok/icons'
import { changeDate, cn } from '@yaksok/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { Profile } from './profile'

type CommentData = {
  id: string
  author: string
  authorProfileImageUrl: string
  content: string
  createdAt: string
  liked: boolean
  mine: boolean
  likeCount: number
}

export type CommentProps = {
  mode: 'reply' | 'comment'
  commentData: CommentData
  isMostLiked?: boolean
  background?: 'comment' | 'reply'
  sideButton?: React.ReactNode
  likeButton?: React.ReactNode
} & Omit<VariantProps<typeof commentVariants>, 'background'>

export const commentVariants = cva('flex flex-col gap-2.5 pt-5', {
  variants: {
    mode: {
      reply: 'border-l-5 border-gray05/50 pl-[11px] pr-4',
      comment: 'px-4',
    },
    background: {
      reply:
        'bg-gradient-to-t from-[rgba(244,244,244,0.5)] from-0% to-[rgba(244,244,244,0.5)] to-100%',
      comment: 'bg-white01',
      mostLiked:
        'bg-gradient-to-t from-[rgba(1,131,129,0.1)] from-0% to-[rgba(1,131,129,0.00)] to-50%',
    },
  },
  defaultVariants: {
    mode: 'comment',
    background: 'comment',
  },
})

export function Comment({
  mode,
  commentData,
  sideButton,
  likeButton,
  isMostLiked = false,
  background = 'comment',
}: CommentProps) {
  return (
    <div
      className={cn(
        commentVariants({
          mode,
          background: isMostLiked ? 'mostLiked' : background,
        })
      )}
    >
      <div className="flex items-center justify-between" role="header">
        <div className="flex items-center gap-1">
          {mode === 'reply' && <ReplyArrow size={8} fill="#959598" />}
          <Profile profileUrl={commentData.authorProfileImageUrl} size={25} />
          <span className="text-caption1 text-gray02">
            {commentData.author}·{changeDate(commentData.createdAt, 'time')}
          </span>
        </div>
        <div>{sideButton}</div>
      </div>
      <div className="text-wrap pr-2 pl-7.5 text-body2 text-gray01">
        {commentData.content}
      </div>
      <div className="flex items-center justify-end border-gray03/20 border-b-1 pb-2">
        {likeButton}
      </div>
    </div>
  )
}

export function NotComment() {
  return (
    <div className="flex items-center justify-center bg-bgColor">
      <h3 className="text-subGray01 text-subhead1">첫 댓글을 남겨보세요!</h3>
    </div>
  )
}
