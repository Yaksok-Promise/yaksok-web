import type { Meta, StoryObj } from '@storybook/react'
import { CheckAllButton } from '@yaksok/ui/agreement'
import { useEffect, useState } from 'react'

const meta = {
  title: 'stories/agreement/check-all-button',
  component: CheckAllButton,
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
    checked: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    checked: false,
  },
} satisfies Meta<typeof CheckAllButton>
export default meta

type Story = StoryObj<typeof CheckAllButton>

export const Primary: Story = {
  render: props => {
    const [checked, setChecked] = useState(props.checked)

    useEffect(() => {
      setChecked(props.checked)
    }, [props.checked])

    return <CheckAllButton checked={checked} setChecked={setChecked} />
  },
  name: 'CheckAllButton',
}
