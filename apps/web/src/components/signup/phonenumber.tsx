import { slicePhoneNumber } from '@/utils/slice-phone-number'
import { Button } from '@yaksok/ui/button'
import TextField from '@yaksok/ui/text-field'
import { useState } from 'react'
import SignupTitle from './signup-title'
import { WithFormContext } from './type'
import { withFormContext } from './with-form-context'
import { useHttpMutation } from '@/hooks/use-http-mutation'
import {
  SendSMSRequest,
  SMSTestResponse,
  SMSVerifyRequest,
} from '@yaksok/api/userType'
import { smsCodeRegex } from '@/validation/zod'

function PhoneNumber({ onNext, methods, title }: WithFormContext) {
  const { register, getValues } = methods
  const [signNumber, setSignNumber] = useState<null | string>(null)
  const [isShow, setIsShow] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const sendSmsMutation = useHttpMutation<SendSMSRequest, SMSTestResponse>(
    '/api/sms/test/code',
    'post'
  )

  const verifySmsMutation = useHttpMutation<SMSVerifyRequest>(
    '/api/sms/verify',
    'post'
  )

  const onVerify = async () => {
    const phoneNumber = getValues('phoneNumber')
    const data = await sendSmsMutation.mutateAsync({
      smsType: 'SIGN_UP',
      phone: phoneNumber,
    })
    console.log(data)
    setSignNumber(data.response)
    setIsShow(true)
    return true
  }

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <div className="flex flex-col gap-4">
        <TextField
          label="휴대폰번호"
          placeholder="- 없이 숫자만 입력"
          type="tel"
          message={{
            regexError: '유효한 휴대폰 번호가 아닙니다.',
            verificationError: '인증번호가 일치하지 않습니다.',
          }}
          regex={/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/}
          onFormat={slicePhoneNumber}
          onVerify={onVerify}
          {...register('phoneNumber')}
          inputMode="numeric"
        />
        {isShow && (
          <TextField
            label="인증번호"
            placeholder="인증번호 6자리를 입력해 주세요."
            type="tel"
            message={{
              regexError: '인증번호 6자리를 입력해 주세요.',
            }}
            regex={smsCodeRegex}
            onCondition={value => {
              if (value === signNumber) {
                setConfirm(true)
              } else {
                setConfirm(false)
              }
              return value === signNumber
            }}
            inputMode="numeric"
          />
        )}
      </div>

      <div className="mt-25">
        <Button disabled={!confirm} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(PhoneNumber)
