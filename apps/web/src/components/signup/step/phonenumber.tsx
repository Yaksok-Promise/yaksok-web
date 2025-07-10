import { useDebounce } from '@/hooks/use-debounce'
import { useHttpMutation } from '@/hooks/use-http-mutation'
import { slicePhoneNumber } from '@/utils/slice-phone-number'
import { SignupRequest, smsCodeRegex } from '@/validation/zod'
import {
  SignupTitle,
  type WithFormContext,
  withFormContext,
} from '@components/signup'
import {
  SMSTestResponse,
  SMSVerifyRequest,
  SendSMSRequest,
} from '@yaksok/api/userType'
import { Button, TextField } from '@yaksok/ui'
import { Modal, useModal } from '@yaksok/ui/modal'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

function PhoneNumber({ onNext, methods, title }: WithFormContext) {
  const { register, getValues } = methods

  const [isShow, setIsShow] = useState(false)
  const [success, setSuccess] = useState(false)

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
          <SmsCodeInput
            onNext={onNext}
            setSuccess={setSuccess}
            success={success}
          />
        )}
      </div>

      <div className="mt-25">
        <Button disabled={!success} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

interface SmsCodeInputProps {
  success: boolean
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  onNext: () => void
}

function SmsCodeInput({ onNext, success, setSuccess }: SmsCodeInputProps) {
  const { openModal, opened, closeModal } = useModal()

  const { getValues } = useFormContext<SignupRequest>()

  const verifySmsMutation = useHttpMutation<SMSVerifyRequest>(
    '/api/sms/verify',
    'post',
    undefined,
    {
      onError: error => {
        console.log(error)
        setSuccess(false)
        openModal()
      },
      onSuccess: () => {
        setSuccess(true)
        openModal()
      },
    }
  )

  const debounce = useDebounce()

  const debouncedVerify = debounce(async (code: string) => {
    const phone = getValues('phoneNumber')

    await verifySmsMutation.mutateAsync({
      code,
      phone,
      smsType: 'SIGN_UP',
    })
  }, 1000)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value.length === 6) {
      await debouncedVerify(value)
    }
  }

  const closeModalNext = () => {
    closeModal()
    onNext()
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
      <PhoneNumberModal
        opened={opened}
        closeModal={success ? closeModalNext : closeModal}
        title={success ? '인증 완료되었습니다' : '인증번호가 일치하지 않습니다'}
      />
    </>
  )
}

type PhoneNumberModalProps = {
  closeModal: () => void
  opened: boolean
  title: string
}
const PhoneNumberModal = ({
  closeModal,
  opened,
  title,
}: PhoneNumberModalProps) => {
  return (
    <Modal opened={opened} hide={closeModal}>
      <Modal.Content>
        <h1 className="mb-[35px] text-body1">{title}</h1>
        <Button onClick={closeModal} size="full">
          확인
        </Button>
      </Modal.Content>
    </Modal>
  )
}

export default withFormContext(PhoneNumber)
