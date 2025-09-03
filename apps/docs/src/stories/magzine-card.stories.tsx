import type { Meta, StoryObj } from '@storybook/react'
import { MagazineListCard, type MagazineListCardProps } from '@yaksok/ui'

const _EX_DATA = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  postType: 'MAGAZINE',
  title:
    '게시글 제목이 너무 길고 어렵게 보이는데 어떨까요? 게시글 제목이 너무 길고 어렵게 보이는데 어떨까요? 게시글 제목이 너무 길고 어렵게 보이는데 어떨까요? 게시글 제목이 너무 길고 어렵게 보이는데 어떨까요?',
  author: '작성자 이름',
  body: '게시글 본문',
  createdAt: '2025-09-02T23:43:46.111Z',
  thumbnailUrl: 'string',
  likes: 26,
  views: 16,
  commentCount: 2,
  tags: [
    {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: '건강',
    },
  ],
  hasImages: true,
}

const meta: Meta<MagazineListCardProps> = {
  title: 'stories/magzine-card',
  component: MagazineListCard,
  tags: ['autodocs'],
  args: {
    data: _EX_DATA,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: props => <MagazineListCard {...props} data={_EX_DATA} />,
  name: 'MAGAZINE LIST CARD',
  args: {
    data: _EX_DATA,
  },
}
