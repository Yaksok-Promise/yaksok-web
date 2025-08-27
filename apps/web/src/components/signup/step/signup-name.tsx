import { Name } from '@/components/common'
import { useHttpMutation } from '@/hooks/tanstak/use-http-mutation'
import { SignupRequest, nameRegex } from '@/validation/zod'
import {
  SignupTitle,
  type WithFormContext,
  withFormContext,
} from '@components/signup'
import { SignupRequest as SignupHttpRequest } from '@yaksok/api/userType'
import { Button } from '@yaksok/ui'
import { useWatch } from 'react-hook-form'

function SignupName({ methods, title, onNext }: WithFormContext) {
  const { control, handleSubmit } = methods
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
    const { confirmPassword, ...rest } = data
    await mutation.mutateAsync(rest)
    onNext()
  })

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <Name methods={methods} />
      <div className="mt-25">
        <Button disabled={!isDisabled} onClick={handleDone}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(SignupName)
