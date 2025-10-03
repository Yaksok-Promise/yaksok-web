import type { Meta, StoryObj } from '@storybook/react'
import { CommunicationDot, Gift, Home, Mail, User } from '@yaksok/icons'
import {
  BottomNavigationLayout,
  BottomNavigationButton,
  BottomNavigationLayoutProps,
} from '@yaksok/ui/bottom-navigation'
import { useState } from 'react'

const meta: Meta<BottomNavigationLayoutProps> = {
  title: 'stories/bottom-navigation',
  component: BottomNavigationLayout,
  decorators: [
    Story => (
      <div className="relative h-screen w-screen justify-center bg-white">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<BottomNavigationLayoutProps>
export default meta

type Story = StoryObj<typeof BottomNavigationLayout>

export const Primary: Story = {
  render: props => {
    const [active, setActive] = useState([
      {
        title: '홈',
        isActive: true,
      },
      {
        title: '커뮤니티',
        isActive: false,
      },
      {
        title: '라운지',
        isActive: false,
      },
      {
        title: '약속상담',
        isActive: false,
      },
      {
        title: '마이',
        isActive: false,
      },
    ])

    return (
      <BottomNavigationLayout {...props}>
        <BottomNavigationButton
          icon={Home}
          title="홈"
          isActive={active[0].isActive}
          onClick={() =>
            setActive([
              {
                title: '홈',
                isActive: true,
              },
              {
                title: '커뮤니티',
                isActive: false,
              },
              {
                title: '라운지',
                isActive: false,
              },
              {
                title: '약속상담',
                isActive: false,
              },
              {
                title: '마이',
                isActive: false,
              },
            ])
          }
        />
        <BottomNavigationButton
          icon={CommunicationDot}
          title="커뮤니티"
          isActive={active[1].isActive}
          onClick={() =>
            setActive([
              {
                title: '홈',
                isActive: false,
              },
              {
                title: '커뮤니티',
                isActive: true,
              },
              {
                title: '라운지',
                isActive: false,
              },
              {
                title: '약속상담',
                isActive: false,
              },
              {
                title: '마이',
                isActive: false,
              },
            ])
          }
        />
        <BottomNavigationButton
          icon={Gift}
          title="라운지"
          isActive={active[2].isActive}
          onClick={() =>
            setActive([
              {
                title: '홈',
                isActive: false,
              },
              {
                title: '커뮤니티',
                isActive: false,
              },
              {
                title: '라운지',
                isActive: true,
              },
              {
                title: '약속상담',
                isActive: false,
              },
              {
                title: '마이',
                isActive: false,
              },
            ])
          }
        />
        <BottomNavigationButton
          icon={Mail}
          title="약속상담"
          isActive={active[3].isActive}
          onClick={() =>
            setActive([
              {
                title: '홈',
                isActive: false,
              },
              {
                title: '커뮤니티',
                isActive: false,
              },
              {
                title: '라운지',
                isActive: false,
              },
              {
                title: '약속상담',
                isActive: true,
              },
              {
                title: '마이',
                isActive: false,
              },
            ])
          }
        />
        <BottomNavigationButton
          icon={User}
          title="마이"
          isActive={active[4].isActive}
          onClick={() =>
            setActive([
              {
                title: '홈',
                isActive: false,
              },
              {
                title: '커뮤니티',
                isActive: false,
              },
              {
                title: '라운지',
                isActive: false,
              },
              {
                title: '약속상담',
                isActive: false,
              },
              {
                title: '마이',
                isActive: true,
              },
            ])
          }
        />
      </BottomNavigationLayout>
    )
  },
  name: 'BottomNavigation',
}
