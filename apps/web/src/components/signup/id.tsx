import { Button } from '@yaksok/ui/button'
import { TextField } from '@yaksok/ui/text-field'

import { useWatch } from 'react-hook-form'
import { emailRegex } from '@/validation/zod'
import { withFormContext } from './with-form-context'
import { WithFormContext } from './type'

function Id({ onNext, methods, title }: WithFormContext) {
  const loginIdValue = useWatch({
    control: methods.control,
    name: 'loginId',
    defaultValue: '',
  })

  const isDisabled = !emailRegex.test(loginIdValue)

  return (
    <div>
      <h1 className="mb-10 text-head5">{title}</h1>
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
