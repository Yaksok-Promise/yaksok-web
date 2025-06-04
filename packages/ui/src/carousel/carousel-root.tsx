import { EmblaOptionsType } from 'embla-carousel'
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
// CarouselContainer.tsx
import React, { ReactElement, useMemo } from 'react'
import { CarouselContext } from './carousel-context'
import { useDotButton } from './use-carousel-dot-button'

// CarouselRoot.tsx
export const CarouselRoot: React.FC<{
  children: ReactElement[]
  options?: EmblaOptionsType
  autoPlayOption?: AutoplayOptionsType
}> = ({ children, options, autoPlayOption }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ ...autoPlayOption }),
  ])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    () => {
      const autoplay = emblaApi?.plugins()?.autoplay
      autoplay?.options?.stopOnInteraction === false
        ? autoplay.reset()
        : autoplay?.stop()
    }
  )

  const value = useMemo(
    () => ({
      embla: emblaApi,
      selectedIndex,
      scrollSnaps,
      onDotButtonClick,
      emblaRef,
    }),
    [emblaApi, selectedIndex, scrollSnaps, onDotButtonClick, emblaRef]
  )

  return (
    <CarouselContext.Provider value={value}>
      <div className="relative mx-auto max-w-3xl">{children}</div>
    </CarouselContext.Provider>
  )
}
