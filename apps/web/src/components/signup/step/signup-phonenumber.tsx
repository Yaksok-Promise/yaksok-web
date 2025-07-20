import { useState } from 'react'
import { Button } from '@yaksok/ui'
import { useModal } from '@yaksok/ui/modal'
import {
  SignupTitle,
  type WithFormContext,
  withFormContext,
} from '@components/signup'
import {
  PhoneNumber,
  PhoneNumberModal,
  SmsCodeInput,
} from '@/components/common'

function SignupPhoneNumberStep({ onNext, methods, title }: WithFormContext) {
  const [isShowCodeInput, setIsShowCodeInput] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { openModal, closeModal, opened } = useModal()

  const handleVerifySent = () => {
    setIsShowCodeInput(true)
  }

  const handleVerifySuccess = () => {
    setIsSuccess(true)
    openModal()
  }

  const handleVerifyError = () => {
    setIsSuccess(false)
    openModal()
  }

  const handleCloseModal = () => {
    if (isSuccess) {
      closeModal()
      onNext()
    } else {
      closeModal()
    }
  }

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>

      <PhoneNumber
        methods={methods}
        smsType="SIGN_UP"
        handleVerify={handleVerifySent}
      />

      {isShowCodeInput && (
        <div className="mt-0.5">
          <SmsCodeInput
            methods={methods}
            success={isSuccess}
            setSuccess={setIsSuccess}
            mutationSuccess={handleVerifySuccess}
            mutationError={handleVerifyError}
          />
        </div>
      )}

      <PhoneNumberModal
        opened={opened}
        closeModal={handleCloseModal}
        title={
          isSuccess ? '인증 완료되었습니다' : '인증번호가 일치하지 않습니다'
        }
      />

      <div className="mt-25">
        <Button disabled={!isSuccess} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(SignupPhoneNumberStep)
