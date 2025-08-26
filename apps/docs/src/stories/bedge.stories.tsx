import type { Meta, StoryObj } from '@storybook/react'
import { Badge, BadgeProps } from '@yaksok/ui'
import { MiniQr, Pill, Qa } from '@yaksok/icons'

const meta: Meta<BadgeProps> = {
  title: 'stories/badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {
    lineBackground: {
      control: {
        type: 'boolean',
      },
    },
    variant: {
      control: {
        type: 'select',
      },
      options: ['card', 'promo'],
    },
    title: {
      control: {
        type: 'text',
      },
    },
    description: {
      control: {
        type: 'text',
      },
    },
    miniTitle: {
      control: {
        type: 'text',
      },
    },
    icon: {
      control: {
        type: 'select',
      },
      options: ['MiniQr', 'Pill', 'Qa'],
    },
  },
} satisfies Meta<BadgeProps>
export default meta

type Story = StoryObj<typeof Badge>

export const Primary: Story = {
  render: props => {
    const icon =
      props.icon === 'MiniQr' ? (
        <MiniQr size={20} />
      ) : props.icon === 'Pill' ? (
        <Pill size={20} />
      ) : (
        <Qa size={20} />
      )
    return <Badge {...props} icon={icon} />
  },
  name: 'Badge',
  args: {
    variant: 'card',
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
          <Badge key={index} {...props} />
        ))}
      </div>
    )
  },
  name: 'Multiple Badge',
  args: {},
}
