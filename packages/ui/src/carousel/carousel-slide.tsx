// CarouselSlide.tsx
import React from 'react'

export const CarouselSlide: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-w-0 flex-[0_0_100%] transform-gpu pl-4">
      <div className="flex h-[19rem] select-none items-center justify-center rounded-[1.8rem] font-semibold text-6xl shadow-inner">
        {children}
      </div>
    </div>
  )
}
