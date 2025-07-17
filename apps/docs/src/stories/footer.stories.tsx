import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from '@yaksok/ui'

const meta: Meta<typeof Footer> = {
  title: 'stories/footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Footer>
export default meta

type Story = StoryObj<typeof Footer>

export const Primary: Story = {
  render: () => <Footer />,
  name: 'Footer',
}
