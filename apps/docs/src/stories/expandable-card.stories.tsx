import type { Meta, StoryObj } from '@storybook/react'
import { ExpandableCard, ExpandableCardProps } from '@yaksok/ui'

const meta: Meta<ExpandableCardProps> = {
  title: 'stories/expandable-card',
  component: ExpandableCard,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string',
    },
    defaultOpen: {
      type: 'boolean',
    },
  },
  decorators: [
    Story => (
      <div className="flex w-[500px] justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<ExpandableCardProps>
export default meta

type Story = StoryObj<ExpandableCardProps>

export const Primary: Story = {
  render: props => {
    return <ExpandableCard {...props} />
  },
  name: 'Expandable Card',
  args: {
    title: '뼈 및 관절 건강',
    items: ['마그네슘', '비타민 K', '글루코사민', 'MSM', '콘드로이틴'],
    defaultOpen: true,
  },
}
