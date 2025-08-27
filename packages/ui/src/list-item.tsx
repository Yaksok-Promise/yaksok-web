import { ChevronRight, SvgIconElement } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

export type ListItemProps = React.ComponentProps<'div'> &
  VariantProps<typeof listItemVariants> & {
    title: string
    navigate?: () => void
    icon?: SvgIconElement
    rightIcon?: ReactNode
    rightIconSize?: number
  }

const listItemVariants = cva('flex items-center justify-between py-3 w-full', {
  variants: {
    mode: {
      line: 'border-b-[1px] border-[#636366]/20',
      blank: '',
    },
    color: {
      black: 'text-black01',
      gray: 'text-gray03',
    },
  },
})
export function ListItem({
  title,
  navigate,
  icon,
  mode,
  color,
  className,
  rightIconSize = 24,
  rightIcon = <ChevronRight size={rightIconSize} stroke="#C4C4C4" />,
  ...props
}: ListItemProps) {
  return (
    <div
      className={cn(listItemVariants({ mode, color }), className)}
      onClick={navigate}
      role="button"
      {...props}
    >
      {icon ? (
        <div className="flex items-center gap-2.5">
          {icon}
          <span>{title}</span>
        </div>
      ) : (
        <span>{title}</span>
      )}
      {rightIcon}
    </div>
  )
}
