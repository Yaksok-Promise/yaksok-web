import type { Meta, StoryObj } from '@storybook/react'
import { PageSpy, PageSpyProps } from '@yaksok/ui/page-spy'

const meta: Meta<PageSpyProps> = {
  component: PageSpy,
}

export default meta

type Story = StoryObj<PageSpyProps>

export const Primary: Story = {
  render: props => {
    const { totalLength, currentIndex } = props
    if (currentIndex >= totalLength) {
      return (
        <div style={{ color: 'red' }}>
          ⚠️ `currentIndex` must be less than `totalLength`
        </div>
      )
    }
    return <PageSpy {...props} />
  },
  name: 'PageSpy',
  argTypes: {
    totalLength: {
      control: {
        type: 'number',
      },
    },
    currentIndex: {
      control: {
        type: 'number',
      },
    },
  },
  args: {
    totalLength: 10,
    currentIndex: 0,
  },
}
