import type { Meta, StoryObj } from '@storybook/react'
import { OauthButton, OauthButtonProps } from '@yaksok/ui'

const meta: Meta<OauthButtonProps> = {
  title: 'stories/oauth-button',
  component: OauthButton,
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
    children: {
      control: {
        type: 'text',
      },
    },
    oauth: {
      options: ['kakao', 'naver', 'apple', 'google'],
      control: {
        type: 'radio',
      },
    },
  },
  args: { oauth: 'kakao' },
} satisfies Meta<OauthButtonProps>
export default meta

type Story = StoryObj<OauthButtonProps>

export const Primary: Story = {
  render: props => <OauthButton {...props}>{props.children}</OauthButton>,
  name: 'Button',
  args: {
    children: 'Button',
    onClick: () => {
      alert('clicked')
    },
  },
}
