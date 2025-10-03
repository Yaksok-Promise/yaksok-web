import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef } from 'react'

export type BottomNavigationLayoutProps = ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode
}

export function BottomNavigationLayout({
  children,
  className,
  ...props
}: BottomNavigationLayoutProps) {
  return (
    <div
      className={cn(
        'fixed right-0 bottom-0 left-0 z-50 mt-22 flex justify-center border-[#E3E3E3]/50 border-t-1 border-solid bg-white',
        className
      )}
      {...props}
    >
      <div className="flex gap-3 px-4 pt-1 pb-7">{children}</div>
    </div>
  )
}
