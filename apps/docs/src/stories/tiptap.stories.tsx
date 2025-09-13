import type { Meta, StoryObj } from '@storybook/react'
import { useCurrentEditor } from '@tiptap/react'

import { MenuBar, TipTapContext, Tiptap } from '@yaksok/ui/tiptap'

const meta: Meta<typeof Tiptap> = {
  title: 'stories/tiptap',
  component: Tiptap,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    Story => (
      <TipTapContext>
        <Story />
      </TipTapContext>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Tiptap>

export const Primary: Story = {
  render: () => {
    const { editor } = useCurrentEditor()
    return (
      <div className="flex flex-col justify-center">
        <Tiptap />
        <MenuBar editor={editor!} />
      </div>
    )
  },
  name: 'Tiptap',
}
