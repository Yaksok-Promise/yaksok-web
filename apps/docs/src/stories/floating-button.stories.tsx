import type { Meta, StoryObj } from '@storybook/react'
import { BlankHeart, Bookmark, Share } from '@yaksok/icons'
import { FloatingButton, FloatingButtonProps } from '@yaksok/ui'

const meta: Meta<FloatingButtonProps> = {
  title: 'stories/floating-button',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },

  decorators: [
    Story => (
      <div className="relative flex h-screen w-[500px] justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    inView: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    inView: false,
  },
} satisfies Meta<FloatingButtonProps>
export default meta

type Story = StoryObj<typeof FloatingButton>

export const Primary: Story = {
  render: props => <FloatingButton {...props}>{props.children}</FloatingButton>,
  name: 'FloatingButton',
  args: {
    children: [
      <button
        onClick={() => {
          console.log('like')
        }}
      >
        <BlankHeart size={24} stroke="#636366" />
      </button>,
      <button
        onClick={() => {
          console.log('scrap')
        }}
      >
        <Bookmark size={24} stroke="#636366" />
      </button>,
      <button
        onClick={() => {
          console.log('share')
        }}
      >
        <Share size={24} stroke="#636366" />
      </button>,
    ] as React.ReactHTMLElement<HTMLButtonElement>[],
  },
}
