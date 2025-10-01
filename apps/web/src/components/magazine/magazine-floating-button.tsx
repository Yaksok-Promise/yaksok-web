import {
  useMagazineLikeOptimistic,
  useMagazineScrapCountOptimistic,
} from '@/hooks/tanstak/use-optimistic-post'
import { BlankHeart, Bookmark, Share } from '@yaksok/icons'
import { FloatingButton } from '@yaksok/ui'
import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef, useMemo } from 'react'

export type MagazineFloatingButtonProps = ComponentPropsWithoutRef<'div'> & {
  inView: boolean
  magazineId: string
  liked: boolean
  scraped: boolean
}

export const MagazineFloatingButton = ({
  inView,
  magazineId,
  className,
  liked = false,
  scraped = false,
  ...props
}: MagazineFloatingButtonProps) => {
  const { handleOptimisticPost: handleLike } =
    useMagazineLikeOptimistic(magazineId)
  const { handleOptimisticPost: handleScrap } =
    useMagazineScrapCountOptimistic(magazineId)

  const handleShare = () => {
    console.log('share')
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const buttonList = useMemo(
    () => [
      <button onClick={handleLike}>
        <BlankHeart
          size={24}
          stroke="#636366"
          fill={liked ? '#636366' : 'none'}
        />
      </button>,
      <button onClick={handleScrap}>
        <Bookmark
          size={24}
          stroke="#636366"
          fill={scraped ? '#636366' : 'none'}
        />
      </button>,
      <button onClick={handleShare}>
        <Share size={24} stroke="#636366" />
      </button>,
    ],
    [liked, scraped, magazineId]
  ) as React.ReactHTMLElement<HTMLButtonElement>[]
  return (
    <FloatingButton inView={inView} className={className} {...props}>
      {buttonList}
    </FloatingButton>
  )
}
