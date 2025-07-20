import { TextField } from '@yaksok/ui'
import { InputProps } from '.'

export function ConfirmPassword({ methods }: InputProps) {
  const onCondition = (value: string) => {
    const password = methods.getValues('password')
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
      {...methods.register('confirmPassword')}
    />
  )
}
