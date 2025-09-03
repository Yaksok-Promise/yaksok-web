import type { Meta, StoryObj } from '@storybook/react'
import { Bell } from '@yaksok/icons'
import { ListItem, ListItemProps } from '@yaksok/ui'

const meta: Meta<ListItemProps> = {
  component: ListItem,
  title: 'stories/list-item',
  argTypes: {
    mode: {
      options: ['line', 'blank'],
      control: {
        type: 'radio',
      },
    },
    color: {
      options: ['black', 'gray'],
      control: {
        type: 'radio',
      },
    },
    rightIconSize: {
      control: {
        type: 'number',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ListItemProps>

export const Primary: Story = {
  render: props => <ListItem {...props} />,
  name: 'ListItem',
  args: {
    mode: 'line',
    color: 'gray',
    title: '회원정보 수정',
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    navigate: () => {},
  },
}

export const ListItemWithIcon: Story = {
  render: props => <ListItem {...props} />,
  name: 'ListItem',
  args: {
    mode: 'blank',
    color: 'black',
    title: '새글 알림',
    // biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
    navigate: () => {},
    icon: <Bell size={18} color="#000000" />,
  },
}
