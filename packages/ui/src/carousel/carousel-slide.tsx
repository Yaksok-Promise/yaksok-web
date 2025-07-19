import { cn } from '@yaksok/utils'
import React from 'react'

export type CarouselSlideProps = {
  className?: string
  children: React.ReactNode
}
export function CarouselSlide({ children, className }: CarouselSlideProps) {
  return (
    <div className={cn('min-w-0 flex-[0_0_98%] transform-gpu', className)}>
      <div className="flex select-none">{children}</div>
    </div>
  )
}
