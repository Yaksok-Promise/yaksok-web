import type { Meta, StoryObj } from '@storybook/react'
import { Search, SearchProps } from '@yaksok/ui'

const meta: Meta<SearchProps> = {
  title: 'stories/search',
  component: Search,
  parameters: {
    layout: 'centered',
    argsTypes: {
      iconPosition: {
        options: ['left', 'right'],
        control: {
          type: 'select',
        },
      },
    },
  },

  tags: ['autodocs'],
} satisfies Meta<SearchProps>
export default meta

type Story = StoryObj<SearchProps>

export const Primary: Story = {
  render: props => <Search {...props} />,
  name: 'Search',
  args: {},
}
