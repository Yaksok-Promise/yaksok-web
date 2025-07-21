import type { Meta, StoryObj } from '@storybook/react'
import { Button, ButtonProps } from '@yaksok/ui'

const meta: Meta<ButtonProps> = {
  title: 'stories/button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="flex w-[500px] justify-center">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    variant: {
      options: ['default'],
      control: {
        type: 'radio',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    rounded: {
      options: ['full', 'md'],
      control: {
        type: 'radio',
      },
    },
    mode: {
      options: ['fill', 'line'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    rounded: 'md',
    mode: 'fill',
  },
} satisfies Meta<ButtonProps>
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: props => <Button {...props}>{props.children}</Button>,
  name: 'Button',
  args: {
    children: 'Button',
    onClick: () => {
      alert('clicked')
    },
  },
}
