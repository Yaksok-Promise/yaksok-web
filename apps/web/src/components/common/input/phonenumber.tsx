import { useDebounce } from '@/hooks/use-debounce'
import { useHttpMutation } from '@/hooks/use-http-mutation'
import { slicePhoneNumber } from '@/utils/slice-phone-number'
import { smsCodeRegex } from '@/validation/zod'
import {
  SMSTestResponse,
  SMSType,
  SMSVerifyRequest,
  SendSMSRequest,
} from '@yaksok/api/userType'
import { TextField } from '@yaksok/ui'
import { InputProps } from '.'

export type PhoneNumberProps = InputProps & {
  smsType: SMSType
  handleVerify?: () => void
}

export function PhoneNumber({
  methods,
  smsType,
  handleVerify,
}: PhoneNumberProps) {
  const sendSmsMutation = useHttpMutation<SendSMSRequest, SMSTestResponse>(
    '/api/sms/test/code',
    'post'
  )

  const onVerify = async () => {
    const phoneNumber = methods.getValues('phoneNumber')
    const data = await sendSmsMutation.mutateAsync({
      smsType,
      phone: phoneNumber,
    })
    console.log(data)
    handleVerify?.()
    return true
  }
  return (
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
        {...methods.register('phoneNumber')}
        inputMode="numeric"
      />
    </div>
  )
}

export type SmsCodeInputProps = InputProps & {
  success: boolean
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  mutationSuccess?: () => void
  mutationError?: (error: unknown) => void
  smsType: SMSType
}

export function SmsCodeInput({
  smsType,
  setSuccess,
  methods,
  mutationSuccess,
  mutationError,
}: SmsCodeInputProps) {
  const verifySmsMutation = useHttpMutation<SMSVerifyRequest>(
    '/api/sms/verify',
    'post',
    undefined,
    {
      onError: error => {
        console.log(error)
        setSuccess(false)
        mutationError?.(error)
      },
      onSuccess: () => {
        setSuccess(true)
        mutationSuccess?.()
      },
    }
  )

  const debounce = useDebounce()

  const debouncedVerify = debounce(async (code: string) => {
    const phone = methods.getValues('phoneNumber')

    await verifySmsMutation.mutateAsync({
      code,
      phone,
      smsType: smsType,
    })
  }, 500)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length === 6) {
      await debouncedVerify(value)
    }
  }

  return (
    <>
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
    </>
  )
}
