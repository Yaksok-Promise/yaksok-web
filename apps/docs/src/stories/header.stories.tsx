// Header.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Bell, ChevronLeft, Hamburger, LogoWithColor } from '@yaksok/icons'
import { Header, type HeaderProps } from '@yaksok/ui' // 실제 경로에 맞게 수정하세요

const meta: Meta<HeaderProps> = {
  component: Header.Container,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="relative h-[200px] w-full overflow-y-auto">
        <Story />
        <div className="mt-13 space-y-4 ">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-16 rounded bg-amber-100">
              Content Block {i + 1}
            </div>
          ))}
        </div>
      </div>
    ),
  ],
  argTypes: {
    theme: {
      options: ['black', 'white'],
      control: {
        type: 'select',
      },
    },
    blur: {
      control: 'boolean',
    },
  },
  args: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const WithLeftAndRight: Story = {
  render: props => (
    <Header.Container {...props}>
      <Header.Left>
        <ChevronLeft />
      </Header.Left>
      <Header.Title>매거진</Header.Title>
      <Header.Right>
        <Hamburger />
      </Header.Right>
    </Header.Container>
  ),
  name: '좌우 버튼',
}

export const WithOnlyLeft: Story = {
  render: props => (
    <Header.Container {...props}>
      <Header.Left>
        <ChevronLeft stroke="currentColor" />
      </Header.Left>
      <Header.Title>매거진</Header.Title>
    </Header.Container>
  ),
  name: '좌측 버튼',
}

export const WithOnlyTitle: Story = {
  render: props => (
    <Header.Container {...props}>
      <Header.Title>매거진</Header.Title>
    </Header.Container>
  ),
  name: '제목',
}

export const HomeHeader: Story = {
  render: props => (
    <Header.Container {...props}>
      <Header.Left>
        <LogoWithColor />
      </Header.Left>
      <Header.Right>
        <Bell />
      </Header.Right>
    </Header.Container>
  ),
  name: 'Home Header',
}
