import { ConfirmPassword, Password } from '@/components/common'
import { passwordRegex } from '@/validation/zod'
import {
  SignupTitle,
  type WithFormContext,
  withFormContext,
} from '@components/signup'
import { Button } from '@yaksok/ui'
import { useWatch } from 'react-hook-form'

export function SignupPassword({ onNext, methods, title }: WithFormContext) {
  const { control } = methods

  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })

  const isPasswordValid = passwordRegex.test(password)
  const isPasswordMatch = password === confirmPassword

  const isNextEnabled = isPasswordValid && isPasswordMatch

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <div className="flex flex-col gap-4">
        <Password methods={methods} />
        <ConfirmPassword methods={methods} />
      </div>

      <div className="mt-25">
        <Button disabled={!isNextEnabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(SignupPassword)
