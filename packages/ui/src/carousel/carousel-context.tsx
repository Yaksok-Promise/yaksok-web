import { EmblaCarouselType } from 'embla-carousel'
import { EmblaViewportRefType } from 'embla-carousel-react'
import { createContext, useContext } from 'react'

type CarouselContextType = {
  embla: EmblaCarouselType | undefined
  emblaRef: EmblaViewportRefType
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const CarouselContext = createContext<CarouselContextType | null>(null)

export const useCarousel = () => {
  const context = useContext(CarouselContext)
  if (!context) throw new Error('Carousel context not found')
  return context
}
