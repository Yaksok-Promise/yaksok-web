import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox, CheckboxProps } from '@yaksok/ui'
import { useEffect, useState } from 'react'

const meta: Meta<CheckboxProps> = {
  title: 'stories/checkbox',
  component: Checkbox,
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
    theme: {
      options: ['default', 'rounded'],
      control: {
        type: 'radio',
      },
    },
    value: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    theme: 'default',
    checked: false,
  },
} satisfies Meta<CheckboxProps>
export default meta

type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
  render: props => {
    const [value, setValue] = useState(false)

    useEffect(() => {
      setValue(props.checked ?? false)
    }, [props.checked])

    return <Checkbox {...props} checked={value} setChecked={setValue} />
  },
  name: 'Checkbox',
}
