import { Button } from '@yaksok/ui/button'
import { TextField } from '@yaksok/ui/text-field'
import { StepPageProps } from './agreement'
import { useFormContext, useWatch } from 'react-hook-form'
import { SignupRequest } from '@/validation/zod'

export default function Id({ onNext }: StepPageProps) {
  const { register, control } = useFormContext<SignupRequest>()

  const loginIdValue = useWatch({
    control,
    name: 'loginId',
  })
  const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  const isDisabled = emailRegex.test(loginIdValue)

  console.log(loginIdValue, isDisabled)
  return (
    <div>
      <h1 className="mb-10 text-head5">아이디를 입력해주세요</h1>
      <TextField
        label="아이디"
        placeholder="아이디를 입력해 주세요"
        type="text"
        message={{
          regexError: '이메일 형식이 올바르지 않습니다.',
          verificationError: '이메일 인증에 실패했습니다.',
        }}
        regex={emailRegex}
        {...register('loginId')}
      />
      <div className="mt-25">
        <Button disabled={!isDisabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
