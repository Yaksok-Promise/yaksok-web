import { SvgComponent } from '@yaksok/icons'
import { ComponentPropsWithoutRef, ReactElement, SVGProps } from 'react'

type SvgIconElement = ReactElement<SVGProps<SvgComponent>>
export type TileProps = {
  icon: SvgIconElement
  title: string
  description: string
} & ComponentPropsWithoutRef<'div'>

export function Tile({
  icon,
  title,
  description,
  onClick,
  ...props
}: TileProps) {
  return (
    <div
      className="flex cursor-pointer flex-col border-[#636366]/20 border-b bg-white01 py-4 last:border-none"
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start gap-5">
        <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-gray-100">
          {icon}
        </div>
        <div>
          <h3 className="text-gray01 text-subhead1">{title}</h3>
          <p className="text-body2 text-gray02">{description}</p>
        </div>
      </div>
    </div>
  )
}
