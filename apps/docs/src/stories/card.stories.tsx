import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@yaksok/ui'
import ExImg from '../assets/ex.png'

const meta: Meta<typeof Card> = {
  component: Card,
}

export default meta

type Story = StoryObj<typeof Card>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: props => <Card {...props}>Hello</Card>,
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
