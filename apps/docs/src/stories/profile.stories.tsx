import type { Meta, StoryObj } from '@storybook/react'
import { Profile, ProfileProps } from '@yaksok/ui'
import ExImg from '../assets/ex.png'

const meta: Meta<ProfileProps> = {
  component: Profile,
  title: 'stories/profile',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: {
        type: 'number',
      },
    },
    isCamera: {
      control: {
        type: 'boolean',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ProfileProps>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: props => <Profile {...props} />,
  name: 'Profile',
  args: {
    profileUrl: ExImg,
    size: 64,
    isCamera: true,
  },
}
