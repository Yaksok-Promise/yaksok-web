import {
  useGeneralForumLikeOptimistic,
  useGeneralForumScrapCountOptimistic,
} from '@/hooks/tanstak/use-optimistic-post'
import { BlankHeart, Bookmark, CommunicationDot, Share } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef } from 'react'

export type GeneralForumButtonListProps = {
  likes: number
  liked: boolean
  scrapCount: number
  commentCount: number
  id: string
}
export function GeneralForumButtonList({
  likes,
  liked,
  scrapCount,
  commentCount,
  id,
}: GeneralForumButtonListProps) {
  const { handleOptimisticPost: handleLike } = useGeneralForumLikeOptimistic(id)
  const { handleOptimisticPost: handleScrap } =
    useGeneralForumScrapCountOptimistic(id)
  const buttonList = [
    {
      icon: (
        <BlankHeart
          size={20}
          stroke="#636366"
          fill={liked ? '#636366' : 'none'}
        />
      ),
      value: likes,
      onClick: handleLike,
    },
    {
      icon: <CommunicationDot size={20} stroke="#636366" />,
      value: commentCount,
      onClick: () => {
        console.log('comment')
      },
    },
    {
      icon: <Bookmark size={20} stroke="#636366" />,
      value: scrapCount,
      onClick: handleScrap,
    },
  ]
  return (
    <div className="flex items-center justify-between border-gray03/20 border-b-4 pt-3 pb-4 text-gray03">
      <div className="flex items-center gap-1.25">
        {buttonList.map((item, idx) => (
          <OuterButton
            key={idx}
            className="flex h-8 w-13 items-center justify-center rounded-[12px] border-1 border-subGray01 py-2 pr-2.5 pl-1.25"
            onClick={item.onClick}
          >
            {item.icon}
            {item.value}
          </OuterButton>
        ))}
      </div>
      <OuterButton
        onClick={() => {
          console.log('share')
        }}
        className="w-9.5 px-1.5"
      >
        <Share size={24} stroke="#636366" />
      </OuterButton>
    </div>
  )
}

const OuterButton: React.FC<ComponentPropsWithoutRef<'button'>> = ({
  children,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'flex h-8 w-13 items-center justify-center rounded-[12px] border-1 border-subGray01 py-2 pr-2.5 pl-1.25',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
