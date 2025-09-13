import type { Meta, StoryObj } from '@storybook/react'
import { Tag, TagInput, TagInputProps, TagProps } from '@yaksok/ui'

const meta: Meta<TagInputProps> = {
  component: TagInput,
  title: 'stories/tag/tagInput',
  tags: ['autodocs'],
  argTypes: {
    maxTags: {
      control: {
        type: 'number',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    tagMaxLength: {
      control: {
        type: 'number',
      },
    },
  },
}

export default meta

type Story = StoryObj<TagInputProps>

export const Primary: Story = {
  render: props => <TagInput {...props} />,
  args: {
    maxTags: 3,
    placeholder: '관련 키워드를 최대 3개까지 입력할 수 있어요',
    tagMaxLength: 20,
  },
}
