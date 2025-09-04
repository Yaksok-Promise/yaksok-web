'use client'

import { MoreHorizontal } from '@yaksok/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@yaksok/ui/dropdown-menu'

export type DropDownProps = {
  data: {
    label: string
    value: string
    render: React.ReactNode
    onClick: () => void
  }[]
  trigger?: React.ReactNode
}

export function DropDown({
  data,
  trigger = <MoreHorizontal />,
}: DropDownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup>
          {data.map(item => (
            <DropdownMenuRadioItem
              value={item.value}
              className="flex items-center justify-center gap-1 text-body1 text-gray04"
              onClick={item.onClick}
            >
              {item.label}
              {item.render}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
