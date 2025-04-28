import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@yaksok/ui/button'

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: props => <Button {...props}>Hello</Button>,
  name: 'Button',
  args: {
    children: 'Hello',
    className: 'bg-red-100',
  },
}
