import { Button } from '@yaksok/ui'
import { cn } from '@yaksok/utils'
import { forwardRef } from 'react'
import { useWatch } from 'react-hook-form'
import SignupTitle from './signup-title'
import { WithFormContext } from './type'
import { withFormContext } from './with-form-context'

interface RadioOptionProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const RadioOption = forwardRef<HTMLInputElement, RadioOptionProps>(
  ({ id, label, className, ...props }, ref) => {
    return (
      <label htmlFor={id} className="flex cursor-pointer items-center gap-3">
        <input
          id={id}
          type="radio"
          ref={ref}
          className={cn('h-5 w-5 accent-black01', className)}
          {...props}
        />
        {label}
      </label>
    )
  }
)

function Sex({ onNext, methods, title }: WithFormContext) {
  const { register, control } = methods

  const gender = useWatch({
    control,
    name: 'gender',
  })

  const confirm = gender === 'MALE' || gender === 'FEMALE'

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <div className="flex gap-5">
        <RadioOption
          id="female"
          value="FEMALE"
          label="여성"
          {...register('gender')}
        />
        <RadioOption
          id="male"
          value="MALE"
          label="남성"
          {...register('gender')}
        />
      </div>
      <div className="mt-25">
        <Button disabled={!confirm} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

RadioOption.displayName = 'RadioOption'

export default withFormContext(Sex)
