import { TextField } from '@yaksok/ui'
import { InputProps } from '.'

type ConfirmPasswordProps = InputProps & {
  confirmName?: string
  isShownIcon?: boolean
}
export function ConfirmPassword({
  methods,
  mode = 'line',
  confirmName = 'password',
  isShownIcon = false,
}: ConfirmPasswordProps) {
  const onCondition = (value: string) => {
    const password = methods.getValues(confirmName)
    return value === password
  }
  return (
    <TextField
      label="비밀번호 확인"
      placeholder="비밀번호 확인"
      type="password"
      message={{
        regexError: '비밀번호가 일치하지 않습니다.',
      }}
      regex={/\*/}
      onCondition={onCondition}
      mode={mode}
      isShownIcon={isShownIcon}
      {...methods.register('confirmPassword')}
    />
  )
}
