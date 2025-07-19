import type { Meta, StoryObj } from '@storybook/react'
import { Bedge, BedgeProps } from '@yaksok/ui'

const meta: Meta<BedgeProps> = {
  title: 'stories/bedge',
  component: Bedge,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<BedgeProps>
export default meta

type Story = StoryObj<typeof Bedge>

export const Primary: Story = {
  render: props => <Bedge {...props} />,
  name: 'Bedge',
  args: {
    miniTitle: '하루 20명 선착순',
    title: '약사 복약 상담',
    description: '약에 대한 고민,\n 전문 약사와 상담해 보세요',
  },
}

export const MultipleBedge = {
  render: () => {
    const data = [
      {
        miniTitle: '하루 20명 선착순',
        title: '약사 복약 상담',
        description: '약에 대한 고민,\n 전문 약사와 상담해 보세요',
      },
      {
        miniTitle: 'Beta',
        title: 'AI 복약 상담',
        description: '간단한 복약 고민,\n AI와 상담해 보세요',
      },
    ]
    return (
      <div className="flex gap-4">
        {data.map((props, index) => (
          <Bedge key={index} {...props} />
        ))}
      </div>
    )
  },
  name: 'Multiple Bedge',
  args: {},
}
