import type { Meta, StoryObj } from '@storybook/react'
import { Tag, TagProps } from '@yaksok/ui'

const meta: Meta<TagProps> = {
  component: Tag,
  title: 'stories/tag/tagItem',
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: {
        type: 'object',
      },
    },
    prefix: {
      control: {
        type: 'text',
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['fit', 'full'],
    },
  },
}

export default meta

type Story = StoryObj<TagProps>

export const Primary: Story = {
  render: props => <Tag {...props} />,
  args: {
    tag: { id: '1', name: '활명수' },
  },
}
