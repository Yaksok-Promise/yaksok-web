'use client'

import { ChevronDown } from '@yaksok/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@yaksok/ui/dropdown-menu'

export type LoungeMagazineSelectProps = {
  value: string
  onValueChange: React.Dispatch<React.SetStateAction<string>>
}

export default function LoungeMagazineSelect({
  value,
  onValueChange,
}: LoungeMagazineSelectProps) {
  const label = value === 'new' ? '최신순' : '인기순'

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center rounded-[8px] bg-gray05/20 px-1.25 py-0.75 text-caption1 text-gray04">
          {label}
          {<ChevronDown size={20} />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="new">최신순</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="popular">인기순</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
