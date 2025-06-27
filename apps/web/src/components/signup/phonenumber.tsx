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
import { SignupRequest, smsCodeRegex } from '@/validation/zod'
import { useFormContext } from 'react-hook-form'
import { useDebounce } from '@/hooks/use-debounce'

function PhoneNumber({ onNext, methods, title }: WithFormContext) {
  const { register, getValues } = methods
  const [signNumber, setSignNumber] = useState<string>('')
  const [isShow, setIsShow] = useState(false)
  const [confirm, setConfirm] = useState(false)

  const sendSmsMutation = useHttpMutation<SendSMSRequest, SMSTestResponse>(
    '/api/sms/test/code',
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

  const onCheckSms = (isCheck: true) => {
    if (isCheck) {
      setConfirm(isCheck)
      onNext()
    }
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
          <SmsCodeInput signNumber={signNumber} setConfirm={onCheckSms} />
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

interface SmsCodeInputProps {
  signNumber: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  setConfirm: (...args: any[]) => void
}

function SmsCodeInput({ signNumber, setConfirm }: SmsCodeInputProps) {
  const { getValues } = useFormContext<SignupRequest>()

  const verifySmsMutation = useHttpMutation<SMSVerifyRequest>(
    '/api/sms/verify',
    'post'
  )

  const debounce = useDebounce()

  const debouncedVerify = debounce((code: string) => {
    const phone = getValues('phoneNumber')
    verifySmsMutation.mutate({ code, phone, smsType: 'SIGN_UP' })
  }, 1000)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    const isValid = smsCodeRegex.test(value) && value === signNumber
    setConfirm(isValid)

    if (isValid) {
      debouncedVerify(value)
    }
  }

  return (
    <TextField
      label="인증번호"
      placeholder="인증번호 6자리를 입력해 주세요."
      type="tel"
      inputMode="numeric"
      message={{
        regexError: '인증번호 6자리를 입력해 주세요.',
      }}
      regex={smsCodeRegex}
      maxLength={6}
      onChange={handleChange}
    />
  )
}

export default withFormContext(PhoneNumber)
