import { useFunnel } from '@/hooks/use-funnel'
import useSmscodeInput from '@/hooks/use-smscode-input'
import { useFlow } from '@/utils/stackflow'
import {
  ChangePasswordRequest,
  ChangePasswordSchema,
  FindPasswordRequest,
  FindPasswordSchema,
  passwordRegex,
} from '@/validation/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@yaksok/ui'
import { ModalRoot } from '@yaksok/ui/modal'
import { useForm, useWatch } from 'react-hook-form'
import {
  ConfirmPassword,
  Id,
  Name,
  Password,
  PhoneNumber,
  PhoneNumberModal,
  SmsCodeInput,
} from '../common'

const PasswordSteps = ['certification', 'changePassword', 'done']

export type PasswordStepsType = (typeof PasswordSteps)[number]

export function FindPassword() {
  const { Funnel, Step, handleNext } = useFunnel<PasswordStepsType>(
    PasswordSteps,
    PasswordSteps[0]
  )

  return (
    <main className="h-full">
      <Funnel>
        <Step name="certification">
          <CertificationStep onNext={handleNext} />
        </Step>
        <Step name="changePassword">
          <ChangeasswordStep onNext={handleNext} />
        </Step>
        <Step name="done">
          <DoneStep />
        </Step>
      </Funnel>

      <ModalRoot />
    </main>
  )
}

type StepProps = { onNext: () => void }
const CertificationStep = ({ onNext }: StepProps) => {
  const methods = useForm<FindPasswordRequest>({
    resolver: zodResolver(FindPasswordSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: FindPasswordRequest) => console.log(data)

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
    <div className="flex h-full flex-col justify-between pb-20">
      <div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <h1 className="mb-10 text-black01 text-head6">
            가입시 등록한 정보를 입력해 주세요
          </h1>
          <Name methods={methods} />
          <Id methods={methods} />
          <PhoneNumber
            methods={methods}
            smsType="RESET_PWD"
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
                smsType="RESET_PWD"
              />
            </div>
          )}
        </form>
      </div>
      <Button disabled={!isSuccess} onClick={onNext}>
        다음
      </Button>
      <PhoneNumberModal
        opened={opened}
        closeModal={handleCloseModal}
        title={
          isSuccess ? '인증 완료되었습니다' : '인증번호가 일치하지 않습니다'
        }
      />
    </div>
  )
}

const ChangeasswordStep = ({ onNext }: StepProps) => {
  const methods = useForm<ChangePasswordRequest>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
  })
  const onSubmit = (data: ChangePasswordRequest) => console.log(data)

  const password = useWatch({ control: methods.control, name: 'password' })
  const confirmPassword = useWatch({
    control: methods.control,
    name: 'confirmPassword',
  })

  const isPasswordValid = passwordRegex.test(password)
  const isPasswordMatch = password === confirmPassword
  const isNextEnabled = isPasswordValid && isPasswordMatch
  return (
    <div className="flex h-screen flex-col justify-between overflow-y-hidden pb-40">
      <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
        <div className="flex flex-col gap-3">
          <h1 className="mb-10 text-black01 text-head6">
            새 비밀번호를 입력해 주세요
          </h1>
          <Password methods={methods} mode="box" />
          <ConfirmPassword methods={methods} mode="box" />
          <Button
            disabled={!isNextEnabled}
            onClick={() => {
              console.log('done')
            }}
          >
            비밀번호 변경하기
          </Button>
        </div>
      </form>
      <Button disabled={!isNextEnabled} onClick={onNext}>
        다음
      </Button>
    </div>
  )
}

const DoneStep = () => {
  const { push } = useFlow()
  const goSignup = () => {
    push('SignupPage', {})
  }
  return (
    <div className="flex h-screen flex-col justify-between overflow-y-hidden pb-40">
      <div className="flex flex-col gap-3">
        <h1 className="mb-10 whitespace-pre-line text-black01 text-head6">
          {
            '새 비밀번호 설정이 완료되어어요\n변경된 비밀번호로 다시 로그인해 주세요'
          }
        </h1>
      </div>

      <Button onClick={goSignup}>로그인하러 가기</Button>
    </div>
  )
}
