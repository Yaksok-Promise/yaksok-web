import { cn } from '@yaksok/utils'
import React, { ComponentPropsWithoutRef } from 'react'

export type FloatingButtonProps = ComponentPropsWithoutRef<'div'> & {
  inView: boolean
  children: React.ReactHTMLElement<HTMLButtonElement>[]
}

export function FloatingButton({
  inView,
  children,
  className,
  ...props
}: FloatingButtonProps) {
  return (
    <div
      className={cn(
        'fixed right-7 bottom-16 flex flex-col items-center justify-center gap-1 rounded-2xl bg-gray03/20 px-1.5 py-2',
        'will-change-[opacity]',
        'transition-[opacity] duration-300 ease-in-out',
        !inView ? 'translate-x-0 opacity-100' : 'pointer-events-none opacity-0',
        className
      )}
      {...props}
    >
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  )
}
