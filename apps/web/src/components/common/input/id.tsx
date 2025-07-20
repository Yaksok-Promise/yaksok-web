import { emailRegex } from '@/validation/zod'
import { TextField } from '@yaksok/ui'
import { InputProps } from '.'

export function Id({ methods }: InputProps) {
  return (
    <TextField
      label="아이디"
      placeholder="아이디를 입력해 주세요"
      type="text"
      message={{
        regexError: '이메일 형식이 올바르지 않습니다.',
        verificationError: '이메일 인증에 실패했습니다.',
      }}
      regex={emailRegex}
      {...methods.register('loginId')}
    />
  )
}
