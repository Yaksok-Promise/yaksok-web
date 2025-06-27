import { Button, TextField } from '@yaksok/ui'
import { emailRegex } from '@/validation/zod'
import { useWatch } from 'react-hook-form'
import {
  SignupTitle,
  withFormContext,
  type WithFormContext,
} from '@components/signup'

function Id({ onNext, methods, title }: WithFormContext) {
  const loginIdValue = useWatch({
    control: methods.control,
    name: 'loginId',
    defaultValue: '',
  })

  const isDisabled = !emailRegex.test(loginIdValue)

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <TextField
        label="아이디"
        placeholder="아이디를 입력해 주세요"
        type="text"
        message={{
          regexError: '이메일 형식이 올바르지 않습니다.',
          verificationError: '이메일 인증에 실패했습니다.',
        }}
        regex={emailRegex}
        {...methods.register('loginId')}
      />
      <div className="mt-25">
        <Button disabled={isDisabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(Id)
