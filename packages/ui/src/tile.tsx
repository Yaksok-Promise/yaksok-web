import { SvgIconElement } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef } from 'react'

export type TileProps = {
  icon: SvgIconElement
  title: string
  description: string
  iconBg?: 'gray' | 'black'
} & ComponentPropsWithoutRef<'div'>

export function Tile({
  icon,
  title,
  description,
  onClick,
  className,
  iconBg = 'gray',
  ...props
}: TileProps) {
  return (
    <div
      className={cn(
        'flex cursor-pointer flex-col border-[#636366]/20 border-b bg-white01 py-4 last:border-none',
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start gap-5">
        <div
          className={cn(
            'flex h-15 w-15 items-center justify-center rounded-xl',
            iconBg === 'gray' ? 'bg-gray-100' : 'bg-black01'
          )}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-gray01 text-subhead1">{title}</h3>
          <p className="whitespace-pre-line text-body2 text-gray02">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
