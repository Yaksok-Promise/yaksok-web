import { BirthDate } from '@/components/common'
import { isValidDate } from '@/utils/is-valid-date'
import {
  SignupTitle,
  type WithFormContext,
  withFormContext,
} from '@components/signup'
import { Button } from '@yaksok/ui'
import { useWatch } from 'react-hook-form'

export function SignupBirthdate({ methods, title, onNext }: WithFormContext) {
  const birthDateValue = useWatch({
    control: methods.control,
    name: 'birthDate',
    defaultValue: '',
  })

  const isPossible = isValidDate(birthDateValue)
  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <BirthDate methods={methods} />
      <div className="mt-25">
        <Button disabled={!isPossible} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(SignupBirthdate)
