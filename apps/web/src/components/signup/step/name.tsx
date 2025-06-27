import { nameRegex, SignupRequest } from '@/validation/zod'
import { Button, TextField } from '@yaksok/ui'
import { useWatch } from 'react-hook-form'
import {
  SignupTitle,
  withFormContext,
  type WithFormContext,
} from '@components/signup'

function Name({ methods, title, onNext }: WithFormContext) {
  const { control, register, handleSubmit } = methods
  const nameValue = useWatch({
    control: control,
    name: 'name',
    defaultValue: '',
  })

  const isDisabled = nameRegex.test(nameValue)

  const handleDone = handleSubmit((data: SignupRequest) => {
    console.log('✅ SUBMIT CALLED', data)
    onNext()
  })

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
        {...register('name')}
      />
      <div className="mt-25">
        <Button disabled={!isDisabled} onClick={handleDone}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(Name)
