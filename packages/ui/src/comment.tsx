import { ReplyArrow } from '@yaksok/icons'
import { useCommentEditorStore } from '@yaksok/store'
import { changeDate, cn } from '@yaksok/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { Profile } from './profile'

export type FlatItem = {
  mode: 'comment' | 'reply'
  createdAt: string
  id: string // comment: parentCommentId, reply: childCommentId
  author: string
  authorProfileImageUrl: string
  content: string
  likeCount: number
  liked: boolean
  mine: boolean
  isFocus: boolean // Focus 모드일 때만 true
  isEdit: boolean // 수정 모드일 때만 true
  parentId?: string // reply일 때만 부모 id
}

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
      focus:
        'bg-gradient-to-t from-[rgba(1,131,129,0.1)] from-0% to-[rgba(1,131,129,0.00)] to-50%',
    },
  },
  defaultVariants: {
    mode: 'comment',
    background: 'comment',
  },
})

/** 배경을 강제로 덮어쓸 때 사용(‘mostLiked’는 내부에서만 결정) */
type BackgroundBase = Exclude<
  NonNullable<VariantProps<typeof commentVariants>['background']>,
  'focus'
>

export type CommentProps = {
  /** 한 덩어리로 전달: mode / isFocus / author ... 모두 포함 */
  item: FlatItem
  /** 기본은 item.mode를 따라가고, 필요 시 강제 오버라이드 */
  backgroundOverride?: BackgroundBase
  sideButton?: React.ReactNode
  likeButton?: React.ReactNode
}

export function Comment({
  item,
  sideButton,
  likeButton,
  backgroundOverride,
}: CommentProps) {
  const { text } = useCommentEditorStore()
  const computedBackground = item.isFocus
    ? 'focus'
    : (backgroundOverride ?? item.mode)

  return (
    <div
      className={cn(
        commentVariants({
          mode: item.mode,
          background: computedBackground,
        })
      )}
    >
      <div className="flex items-center justify-between" role="header">
        <div className="flex items-center gap-1">
          {item.mode === 'reply' && <ReplyArrow size={8} fill="#959598" />}
          <Profile profileUrl={item.authorProfileImageUrl} size={25} />
          <span className="text-caption1 text-gray02">
            {item.author}·{changeDate(item.createdAt, 'time')}
          </span>
        </div>
        <div>{sideButton}</div>
      </div>

      {item.isEdit ? (
        <textarea
          className="w-full text-wrap border-1 border-gray06 p-2 text-body2 text-gray01"
          value={text}
          rows={2}
          disabled
        />
      ) : (
        <div className="text-wrap pr-2 pl-7.5 text-body2 text-gray01">
          {item.content}
        </div>
      )}

      <div className="flex items-center justify-end border-gray03/20 border-b-1 pb-2">
        {likeButton}
      </div>
    </div>
  )
}

export function NotComment() {
  return (
    <div className="flex items-center justify-center bg-bgColor py-5">
      <h3 className="text-subGray01 text-subhead1">첫 댓글을 남겨보세요!</h3>
    </div>
  )
}
