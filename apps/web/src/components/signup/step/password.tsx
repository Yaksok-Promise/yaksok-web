import { passwordRegex } from '@/validation/zod'
import { Button, TextField } from '@yaksok/ui'
import { useWatch } from 'react-hook-form'
import {
  SignupTitle,
  withFormContext,
  type WithFormContext,
} from '@components/signup'

function Password({ onNext, methods, title }: WithFormContext) {
  const { register, control } = methods

  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })

  const isPasswordValid = passwordRegex.test(password)
  const isPasswordMatch = password === confirmPassword

  const isNextEnabled = isPasswordValid && isPasswordMatch

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <div className="flex flex-col gap-4">
        <TextField
          label="비밀번호"
          placeholder="영문, 숫자 특수문자 조합 10글자 이상"
          type="password"
          message={{
            regexError: '유효한 비밀번호 형식이 아닙니다.',
          }}
          regex={passwordRegex}
          {...register('password')}
        />
        <TextField
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          type="password"
          message={{
            regexError: '비밀번호가 일치하지 않습니다.',
          }}
          regex={/\*/}
          onCondition={value => {
            return value === password
          }}
          {...register('confirmPassword')}
        />
      </div>

      <div className="mt-25">
        <Button disabled={!isNextEnabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(Password)
