import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsProps } from '@yaksok/ui'

const meta: Meta<TabsProps> = {
  title: 'stories/tabs',
  component: Tabs,
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
    orientation: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'radio',
      },
    },
    variant: {
      options: ['dot', 'box'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    orientation: 'horizontal',
    tabInfo: [
      {
        value: 'tab1',
        label: '추천 제품',
        content: <div>T제품 추천</div>,
      },
      {
        value: 'tab2',
        label: '내 주변 약국 인기 제품',
        content: <div>내주변 약국 인기 제품</div>,
      },
      {
        value: 'tab3',
        label: '이벤트',
        content: <div>이벤트</div>,
      },
    ],
    variant: 'dot',
  },
} satisfies Meta<TabsProps>
export default meta

type Story = StoryObj<TabsProps>

export const Primary: Story = {
  render: props => <Tabs {...props} />,
  name: 'Tabs',
  args: {
    orientation: 'horizontal',
    tabInfo: [
      {
        value: 'tab1',
        label: '추천 제품',
        content: <div>T제품 추천</div>,
      },
      {
        value: 'tab2',
        label: '내 주변 약국 인기 제품',
        content: <div>내주변 약국 인기 제품</div>,
      },
      {
        value: 'tab3',
        label: '이벤트',
        content: <div>이벤트</div>,
      },
    ],
  },
}
