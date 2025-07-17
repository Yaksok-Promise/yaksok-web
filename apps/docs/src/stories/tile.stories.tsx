import type { Meta, StoryObj } from '@storybook/react'
import { Graph, Pills } from '@yaksok/icons'
import { Tile, TileProps } from '@yaksok/ui'

const meta: Meta<TileProps> = {
  title: 'stories/tile',
  component: Tile,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<TileProps>
export default meta

type Story = StoryObj<TileProps>

export const Primary: Story = {
  render: props => <Tile {...props} />,
  name: 'Tile',
  args: {
    title: '일반의약품 및 건강기능식품 성분',
    description: '내가 먹고 있는 영양제 주의할 점은?',
    icon: <Pills size={60} />,
  },
}

export const MultipleTile = {
  render: () => {
    return (
      <div className="flex flex-col rounded-2xl bg-white01 px-5 py-4 shadow-basic2">
        <Tile
          icon={<Pills size={60} />}
          title="일반의약품 및 건강기능식품 성분"
          description="내가 먹고 있는 영양제 주의할 점은?"
          onClick={() => alert('첫 번째 카드 선택')}
        />
        <Tile
          icon={<Graph size={60} />}
          title="일반의약품 성분 비교"
          description="나에게 더 잘 맞는 영양제 성분은?"
          onClick={() => alert('두 번째 카드 선택')}
        />
      </div>
    )
  },
  name: 'Multiple Tile',
  args: {},
}
