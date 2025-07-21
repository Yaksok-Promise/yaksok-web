import { passwordRegex } from '@/validation/zod'
import { TextField } from '@yaksok/ui'
import { InputProps } from '.'

type PasswordProps = InputProps & {
  type?: string
  isShownIcon?: boolean
}

export function Password({
  methods,
  type = 'password',
  mode = 'line',
  isShownIcon = false,
}: PasswordProps) {
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
      isShownIcon={isShownIcon}
      {...methods.register(type)}
    />
  )
}
