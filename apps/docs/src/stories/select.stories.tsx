import type { Meta, StoryObj } from '@storybook/react'
import { ChevronDown } from '@yaksok/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@yaksok/ui/dropdown-menu'
import { useState } from 'react'

const meta: Meta<typeof DropdownMenu> = {
  title: 'stories/select',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
    },

    dir: {
      control: {
        type: 'select',
      },
      options: ['ltr', 'rtl'],
    },
  },
}
export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Primary: Story = {
  render: props => {
    const [value, setValue] = useState<string>('new')
    const label = value === 'new' ? '최신순' : '인기순'
    return (
      <DropdownMenu modal={false} {...props}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center rounded-[8px] bg-gray05/20 px-1.25 py-0.75 text-caption1 text-gray04">
            {label}
            {<ChevronDown size={20} />}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            <DropdownMenuRadioItem value="new">최신순</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">
              인기순
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
  name: 'Select',
}
