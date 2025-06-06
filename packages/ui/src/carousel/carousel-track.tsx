import { cn } from '@yaksok/utils'
import { ReactElement } from 'react'
import { useCarousel } from './carousel-context'
import { DivWihoutRefAndChildren } from './carousel-root'

// CarouselTrack.tsx
export const CarouselTrack: React.FC<
  {
    children: ReactElement[] | ReactElement
  } & DivWihoutRefAndChildren
> = ({ children, className, ...props }) => {
  const { emblaRef } = useCarousel()

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className={cn('ml-[-1rem] flex touch-pan-y', className)} {...props}>
        {children}
      </div>
    </div>
  )
}
