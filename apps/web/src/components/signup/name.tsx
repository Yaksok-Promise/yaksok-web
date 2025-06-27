import { TextField } from '@yaksok/ui/text-field'
import { WithFormContext } from './type'
import { useWatch } from 'react-hook-form'
import { Button } from '@yaksok/ui/button'
import { withFormContext } from './with-form-context'
import { nameRegex } from '@/validation/zod'

function Name({ methods, title, onNext }: WithFormContext) {
  const nameValue = useWatch({
    control: methods.control,
    name: 'name',
    defaultValue: '',
  })

  const isDisabled = nameRegex.test(nameValue)

  return (
    <div>
      <h1 className="mb-10 text-head5">{title}</h1>
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
      <div className="mt-25">
        <Button disabled={!isDisabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(Name)
