import { passwordRegex } from '@/validation/zod'
import { TextField, TextFieldProps } from '@yaksok/ui'
import { InputProps } from '.'

type PasswordProps = InputProps & Omit<TextFieldProps, 'regex' | 'message'>
export function Password({
  methods,
  type = 'password',
  mode = 'line',
  isShownIcon = false,
  placeholder = '영문, 숫자 특수문자 조합 10글자 이상',
  label = '비밀번호',
  value,
  className,
  ...rest
}: PasswordProps) {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type="password"
      message={{
        regexError: '유효한 비밀번호 형식이 아닙니다.',
      }}
      regex={passwordRegex}
      mode={mode}
      isShownIcon={isShownIcon}
      value={value}
      className={className}
      {...methods.register(type)}
      {...rest}
    />
  )
}
