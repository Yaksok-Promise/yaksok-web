import type { Meta, StoryObj } from '@storybook/react'

import { Tiptap } from '@yaksok/ui'

const meta: Meta<typeof Tiptap> = {
  title: 'stories/tiptap',
  component: Tiptap,
  tags: ['autodocs'],
  argTypes: {},
}
export default meta

type Story = StoryObj<typeof Tiptap>

export const Primary: Story = {
  render: () => {
    return <Tiptap />
  },
  name: 'Tiptap',
}
