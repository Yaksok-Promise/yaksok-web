import {
  PhoneNumber,
  PhoneNumberModal,
  SmsCodeInput,
} from '@/components/common'
import useSmscodeInput from '@/hooks/use-smscode-input'
import {
  SignupTitle,
  type WithFormContext,
  withFormContext,
} from '@components/signup'
import { Button } from '@yaksok/ui'

function SignupPhoneNumberStep({ onNext, methods, title }: WithFormContext) {
  const {
    isShowCodeInput,
    isSuccess,
    setIsSuccess,
    handleVerifySent,
    handleVerifySuccess,
    handleVerifyError,
    handleCloseModal,
    opened,
  } = useSmscodeInput()

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
            smsType="SIGN_UP"
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
