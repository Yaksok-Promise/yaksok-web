import { cn } from '@yaksok/utils'
import React from 'react'
export const BottomsheetLikeBackground = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={cn('relative min-h-screen w-full bg-black01', className)}
      {...props}
    >
      <div className="h-30 w-full bg-black01" />
      <div className="min-h-screen w-full rounded-t-[20px] bg-white">
        {children}
      </div>
    </div>
  )
}
