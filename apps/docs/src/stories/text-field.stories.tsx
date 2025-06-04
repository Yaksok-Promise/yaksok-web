import type { Meta, StoryObj } from '@storybook/react'

import TextField from '@yaksok/ui/text-field'

type TextFieldProps = React.ComponentProps<'input'>

const meta: Meta<TextFieldProps> = {
  title: 'Input/TextField',
  component: TextField,
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
    type: {
      control: {
        disable: true,
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<TextFieldProps>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    placeholder: '텍스트 입력',
    type: 'text',
  },
}
