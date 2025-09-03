import { useMagazineLikeOptimistic } from '@/hooks/tanstak/use-magazine-like-optimistic'
import { BlankHeart, Bookmark, Share } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef } from 'react'

export type MagazineFloatingButtonProps = ComponentPropsWithoutRef<'div'> & {
  inView: boolean
  magazineId: string
}

export const MagazineFloatingButton = ({
  inView,
  magazineId,
  className,
  ...props
}: MagazineFloatingButtonProps) => {
  const { handleLike } = useMagazineLikeOptimistic(magazineId, 'POST')

  const handleBookmark = () => {
    console.log('bookmark')
  }
  const handleShare = () => {
    console.log('share')
  }
  return (
    <div
      className={cn(
        'fixed right-7 bottom-16 flex flex-col items-center justify-center gap-1 rounded-2xl bg-gray03/20 px-1.5 py-2',
        'will-change-[opacity]',
        'transition-[opacity] duration-300 ease-in-out',
        !inView ? 'translate-x-0 opacity-100' : 'pointer-events-none opacity-0',
        className
      )}
      {...props}
    >
      <button onClick={handleLike}>
        <BlankHeart size={20} stroke="#636366" />
      </button>
      <button onClick={handleBookmark}>
        <Bookmark size={24} stroke="#636366" />
      </button>
      <button onClick={handleShare}>
        <Share size={24} stroke="#636366" />
      </button>
    </div>
  )
}
