import type { Meta, StoryObj } from '@storybook/react'

import TextField, { TextFieldProps } from '@yaksok/ui/text-field'

const meta: Meta<TextFieldProps> = {
  title: 'stories/text-field',
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
    onVerify: {
      options: [true, false],
      control: {
        type: 'select',
      },
    },
  },
  args: {},
} satisfies Meta<TextFieldProps>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    placeholder: '이메일을 입력해 주세요',
    type: 'text',
    label: '이메일',
    regex: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: {
      regexError: '이메일 형식이 올바르지 않습니다.',
      verificationError: '이메일 인증에 실패했습니다.',
    },
  },
  render: args => {
    const handleVerify = (value: string) => {
      console.log(value)
      return args.onVerify as boolean
    }

    return (
      <TextField {...({ ...args, onVerify: handleVerify } as TextFieldProps)} />
    )
  },
}
