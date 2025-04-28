import type { Meta, StoryObj } from '@storybook/react'
import { Code } from '@yaksok/ui/code'

const meta: Meta<typeof Code> = {
  component: Code,
}

export default meta

type Story = StoryObj<typeof Code>

export const Primary: Story = {
  render: props => <Code {...props}>Hello</Code>,
  name: 'Code',
  args: {
    children: 'code',
  },
}
