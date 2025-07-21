import { passwordRegex } from '@/validation/zod'
import { TextField } from '@yaksok/ui'
import { InputProps } from '.'

export function Password({ methods, mode = 'line' }: InputProps) {
  return (
    <TextField
      label="비밀번호"
      placeholder="영문, 숫자 특수문자 조합 10글자 이상"
      type="password"
      message={{
        regexError: '유효한 비밀번호 형식이 아닙니다.',
      }}
      regex={passwordRegex}
      mode={mode}
      {...methods.register('password')}
    />
  )
}
