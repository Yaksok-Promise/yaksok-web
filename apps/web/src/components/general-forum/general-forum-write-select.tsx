import { Category, useMagazineStore } from '@yaksok/store'

import { ChevronDown } from '@yaksok/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@yaksok/ui/dropdown-menu'

export function GeneralForumWriteSelect() {
  const { category, setCategory } = useMagazineStore()
  const categoryToKorean = {
    QUESTION: '질문',
    REVIEW: '후기',
    DAILY: '잡담·일상',
  } as const
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex h-full items-center text-subhead1 text-white">
          {categoryToKorean[category as Category]}
          <ChevronDown size={20} stroke="white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          onValueChange={value => {
            setCategory(value as Category)
          }}
          value={category}
        >
          <DropdownMenuRadioItem value="REVIEW">후기</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="DAILY">잡담·일상</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="QUESTION">질문</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
