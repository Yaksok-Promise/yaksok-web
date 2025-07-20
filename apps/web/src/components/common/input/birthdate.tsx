import { isValidDate } from '@/utils/is-valid-date'
import { TextField } from '@yaksok/ui'
import { InputProps } from '.'

export function BirthDate({ methods }: InputProps) {
  return (
    <TextField
      label="생년월일"
      placeholder="생년월일 8자리 (YYYYMMDD)"
      type="text"
      message={{
        regexError: '8자리를 입력해 주세요',
      }}
      regex={/\*/}
      onCondition={value => {
        return isValidDate(value)
      }}
      {...methods.register('birthDate')}
    />
  )
}
