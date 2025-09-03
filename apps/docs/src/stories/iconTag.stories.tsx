import type { Meta, StoryObj } from '@storybook/react'
import { Bell } from '@yaksok/icons'
import { IconTag, IconTagProps } from '@yaksok/ui'

const meta: Meta<IconTagProps> = {
  component: IconTag,
  title: 'stories/iconTag',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
    labelClassName: {
      control: {
        type: 'text',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
}

export default meta

type Story = StoryObj<IconTagProps>

export const Primary: Story = {
  render: props => <IconTag {...props} />,
  name: 'stories/iconTag',
  args: {
    label: '10',
    icon: <Bell size={12} stroke="#959598" />,
    labelClassName: 'text-gray04',
  },
}
