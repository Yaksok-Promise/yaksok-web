import { TextField } from '@yaksok/ui/text-field'
import { WithFormContext } from './type'
import { useWatch } from 'react-hook-form'
import { isValidDate } from '@/utils/is-valid-date'
import { Button } from '@yaksok/ui/button'
import { withFormContext } from './with-form-context'

function BirthDate({ methods, title, onNext }: WithFormContext) {
  const birthDateValue = useWatch({
    control: methods.control,
    name: 'birthDate',
    defaultValue: '',
  })

  const isPossible = isValidDate(birthDateValue)
  return (
    <div>
      <h1 className="mb-10 text-head5">{title}</h1>
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
      <div className="mt-25">
        <Button disabled={!isPossible} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(BirthDate)
