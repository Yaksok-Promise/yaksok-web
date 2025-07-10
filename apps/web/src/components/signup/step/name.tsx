import { useHttpMutation } from '@/hooks/use-http-mutation'
import { SignupRequest, nameRegex } from '@/validation/zod'
import {
  SignupTitle,
  type WithFormContext,
  withFormContext,
} from '@components/signup'
import { SignupRequest as SignupHttpRequest } from '@yaksok/api/userType'
import { Button, TextField } from '@yaksok/ui'
import { useWatch } from 'react-hook-form'

function Name({ methods, title, onNext }: WithFormContext) {
  const { control, register, handleSubmit } = methods
  const nameValue = useWatch({
    control: control,
    name: 'name',
    defaultValue: '',
  })

  const isDisabled = nameRegex.test(nameValue)

  const mutation = useHttpMutation<SignupHttpRequest>(
    '/api/user/signup',
    'post'
  )

  const handleDone = handleSubmit(async (data: SignupRequest) => {
    console.log('✅ SUBMIT CALLED', data)
    const { confirmPassword, ...rest } = data
    await mutation.mutateAsync(rest)
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
