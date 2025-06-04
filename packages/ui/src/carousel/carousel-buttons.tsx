import { cn } from '@yaksok/utils'
// CarouselDotButton.tsx
import React, { ComponentPropsWithRef } from 'react'
import { useCarousel } from './carousel-context'

type PropType = ComponentPropsWithRef<'button'>

export const DotButton: React.FC<PropType> = props => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}

export const CarouselDotButton: React.FC = () => {
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarousel()

  return (
    <div className="mt-7 grid grid-cols-[auto_1fr] justify-between gap-4">
      <div className="-mr-[0.6rem] flex flex-wrap items-center justify-end">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn(
              'relative inline-flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded-full',
              'after:h-[1.4rem] after:w-[1.4rem] after:rounded-full after:shadow-[inset_0_0_0_2px_#ccc] after:content-[""]',
              index === selectedIndex && 'after:shadow-[inset_0_0_0_2px_#000]'
            )}
          />
        ))}
      </div>
    </div>
  )
}
