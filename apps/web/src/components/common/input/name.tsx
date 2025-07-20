import { TextField } from '@yaksok/ui'
import { InputProps } from '.'
import { nameRegex } from '@/validation/zod'

export function Name({ methods }: InputProps) {
  return (
    <TextField
      label="이름"
      placeholder="김약속"
      type="text"
      message={{
        regexError: '2글자 이상 한글로 입력해주세요',
      }}
      regex={nameRegex}
      {...methods.register('name')}
    />
  )
}
