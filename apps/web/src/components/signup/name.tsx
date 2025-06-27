import { nameRegex } from '@/validation/zod'
import { Button } from '@yaksok/ui/button'
import { TextField } from '@yaksok/ui/text-field'
import { useWatch } from 'react-hook-form'
import SignupTitle from './signup-title'
import { WithFormContext } from './type'
import { withFormContext } from './with-form-context'

function Name({ methods, title, onNext }: WithFormContext) {
  const nameValue = useWatch({
    control: methods.control,
    name: 'name',
    defaultValue: '',
  })

  const isDisabled = nameRegex.test(nameValue)

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
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
