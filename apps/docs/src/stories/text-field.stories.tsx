import type { Meta, StoryObj } from '@storybook/react'

import { TextField, TextFieldProps } from '@yaksok/ui'

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
      options: ['text', 'password'],
      control: {
        type: 'select',
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

export const Email: Story = {
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

export const PhoneNumber: Story = {
  args: {
    label: '휴대폰번호',
    placeholder: '- 없이 숫자만 입력',
    type: 'text',
    regex: /^[0-9]{10,11}$/,
    message: {
      regexError: '휴대폰번호 형식이 올바르지 않습니다.',
      verificationError: '휴대폰번호 인증에 실패했습니다.',
    },
    onFormat: (value: string) => {
      return value.replace(/[^0-9]/g, '')
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
