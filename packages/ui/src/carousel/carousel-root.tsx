import { cn } from '@yaksok/utils'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import React, { ComponentPropsWithoutRef, ReactElement, useMemo } from 'react'
import { CarouselContext } from './carousel-context'
import { useDotButton } from './use-carousel-dot-button'

export type DivWihoutRefAndChildren = Omit<
  ComponentPropsWithoutRef<'div'>,
  'children'
>
// CarouselRoot.tsx
export const CarouselRoot: React.FC<
  {
    children: ReactElement[] | ReactElement
    options?: EmblaOptionsType
    autoPlayOption?: AutoplayOptionsType
  } & DivWihoutRefAndChildren
> = ({ children, options, autoPlayOption, className, ...props }) => {
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
      <div className={cn('relative mx-auto max-w-3xl', className)} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}
