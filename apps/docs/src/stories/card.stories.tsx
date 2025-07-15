import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardProps, MagazineCard, MagazineCardProps } from '@yaksok/ui'
import ExImg from '../assets/ex.png'
import MagazineImg from '../assets/magazine.png'

const meta: Meta<MagazineCardProps | CardProps> = {
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>
type MagazineStory = StoryObj<typeof MagazineCard>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: props => <Card {...props} />,
  name: 'Card',
  args: {
    imgSrc: ExImg,
    imgAlt: 'ex',
    imgFallbackSrc: ExImg,
    title: '비맥스 메타정',
    classification: '멀티비티민',
    description:
      '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
    brand: 'GC녹십자',
  },
}

export const Magazine: MagazineStory = {
  render: props => <MagazineCard {...props} />,
  name: 'Magazine Card',
  args: {
    imgSrc: MagazineImg,
    imgAlt: 'ex',
    imgFallbackSrc: ExImg,
    title: '오늘의 피로는 술로 풀고 숙취는 이렇게 푸는 거야',
    date: '2025.07.15',
    number: 1,
  },
}
