import { TextField } from '@yaksok/ui'
import { InputProps } from '.'

type ConfirmPasswordProps = InputProps & {
  confirmName?: string
  isShownIcon?: boolean
  label?: string
  placeholder?: string
  bottomLabel?: string
}
export function ConfirmPassword({
  methods,
  mode = 'line',
  confirmName = 'password',
  isShownIcon = false,
  label = '비밀번호 확인',
  placeholder = '비밀번호 확인',
  bottomLabel,
}: ConfirmPasswordProps) {
  const onCondition = (value: string) => {
    const password = methods.getValues(confirmName)
    return value === password
  }
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      type="password"
      message={{
        regexError: '비밀번호가 일치하지 않습니다.',
      }}
      regex={/\*/}
      onCondition={onCondition}
      mode={mode}
      isShownIcon={isShownIcon}
      bottomLabel={bottomLabel}
      {...methods.register('confirmPassword')}
    />
  )
}
