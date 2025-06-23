import { SignupRequest, passwordRegex } from '@/validation/zod'
import { Button } from '@yaksok/ui/button'
import TextField from '@yaksok/ui/text-field'
import { useFormContext, useWatch } from 'react-hook-form'
import { StepPageProps } from './agreement'

export default function Password({ onNext }: StepPageProps) {
  const { register, control } = useFormContext<SignupRequest>()

  const password = useWatch({ control, name: 'password' })
  const confirmPassword = useWatch({ control, name: 'confirmPassword' })

  const isPasswordValid = passwordRegex.test(password)
  const isPasswordMatch = password === confirmPassword

  const isNextEnabled = isPasswordValid && isPasswordMatch

  return (
    <div>
      <h1 className="mb-10 text-head5">비밀번호를 입력해주세요</h1>
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
