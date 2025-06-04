import { useCallback } from 'react'
import { useCarousel } from './carousel-context'

// CarouselTrack.tsx
export const CarouselTrack: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { emblaRef } = useCarousel()

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="ml-[-1rem] flex touch-pan-y">{children}</div>
    </div>
  )
}
