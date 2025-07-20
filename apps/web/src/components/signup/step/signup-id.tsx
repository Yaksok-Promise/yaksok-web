import { Id } from '@/components/common'
import { emailRegex } from '@/validation/zod'
import {
  SignupTitle,
  type WithFormContext,
  withFormContext,
} from '@components/signup'
import { Button } from '@yaksok/ui'
import { useWatch } from 'react-hook-form'

export function SignupId({ onNext, methods, title }: WithFormContext) {
  const loginIdValue = useWatch({
    control: methods.control,
    name: 'loginId',
    defaultValue: '',
  })

  const isDisabled = !emailRegex.test(loginIdValue)

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <Id methods={methods} />
      <div className="mt-25">
        <Button disabled={isDisabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(SignupId)
