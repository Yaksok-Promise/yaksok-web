// stories/comment.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import {
  CommunicationDot,
  MoreVertical,
  Pencil,
  Trash,
  TriangleWarning,
} from '@yaksok/icons'
import { DropDown, DropDownProps } from '@yaksok/ui'
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls'

const SAMPLE_DROPDOWN_MENU_LIST_MINE = [
  {
    label: '수정',
    value: 'edit',
    render: <Pencil size={16} stroke="#018381" />,
    onClick: () => {
      alert('수정')
    },
  },
  {
    label: '삭제',
    value: 'delete',
    render: <Trash size={16} stroke="#018381" />,
    onClick: () => {
      alert('삭제')
    },
  },
]

const SAMPLE_DROPDOWN_MENU_LIST_NOT_MINE = [
  {
    label: '답글',
    value: 'reply',
    render: <CommunicationDot size={16} stroke="#018381" />,
    onClick: () => {
      alert('답글')
    },
  },
  {
    label: '신고',
    value: 'report',
    render: <TriangleWarning size={16} stroke="#018381" />,
    onClick: () => {
      alert('신고')
    },
  },
]

const meta: TypeWithDeepControls<Meta<DropDownProps>> = {
  title: 'stories/drop-down',
  component: DropDown,
  tags: ['autodocs'],
  parameters: {
    deepControls: { enabled: true },
  },

  args: {
    data: SAMPLE_DROPDOWN_MENU_LIST_MINE,
    trigger: <MoreVertical size={40} stroke="black" />,
  },
}
export default meta

type Story = StoryObj<DropDownProps>

export const MineDropDown: Story = {
  args: {
    data: SAMPLE_DROPDOWN_MENU_LIST_MINE,
  },
}

export const NotMineDropDown: Story = {
  args: {
    data: SAMPLE_DROPDOWN_MENU_LIST_NOT_MINE,
  },
}
