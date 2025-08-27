import { useHttpMutation } from '@/hooks/tanstak/use-http-mutation'
import { useFunnel } from '@/hooks/use-funnel'
import useSmscodeInput from '@/hooks/use-smscode-input'
import { useFlow } from '@/utils/stackflow'
import {
  ResetPasswordRequest,
  ResetPasswordSchema,
  passwordRegex,
} from '@/validation/zod'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordRequest as ResetPasswordHttpRequest } from '@yaksok/api/userType'
import { Button } from '@yaksok/ui'
import { ModalRoot, useModal } from '@yaksok/ui/modal'
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import {
  ConfirmPassword,
  Id,
  Name,
  Password,
  PhoneNumber,
  PhoneNumberModal,
  ResetPasswordModal,
  SmsCodeInput,
} from '../common'

const PasswordSteps = ['certification', 'changePassword', 'done']

export type PasswordStepsType = (typeof PasswordSteps)[number]

export function FindPassword() {
  const { Funnel, Step, handleNext } = useFunnel<PasswordStepsType>(
    PasswordSteps,
    PasswordSteps[0]
  )

  const methods = useForm<ResetPasswordRequest>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: ResetPasswordRequest) => console.log(data)

  return (
    <main className="h-[100%]">
      <DevTool control={methods.control} />
      <FormProvider {...methods}>
        <form className="h-full" onSubmit={methods.handleSubmit(onSubmit)}>
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
        </form>
      </FormProvider>

      <ModalRoot />
    </main>
  )
}

type StepProps = { onNext: () => void }
const CertificationStep = ({ onNext }: StepProps) => {
  const methods = useFormContext<ResetPasswordRequest>()
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
      <div className="flex flex-col gap-3">
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
  const { opened, closeModal, openModal } = useModal()
  const methods = useFormContext<ResetPasswordRequest>()

  const password = useWatch({ control: methods.control, name: 'newPassword' })
  const confirmPassword = useWatch({
    control: methods.control,
    name: 'confirmPassword',
  })

  const isPasswordValid = passwordRegex.test(password)
  const isPasswordMatch = password === confirmPassword
  const isNextEnabled = isPasswordValid && isPasswordMatch

  const mutation = useHttpMutation<ResetPasswordHttpRequest>(
    '/api/user/reset/password',
    'post',
    undefined,
    {
      onSuccess: () => {
        onNext()
      },
      onError: e => {
        console.log(e)
        openModal()
      },
    }
  )

  const handleDone = methods.handleSubmit(
    async (data: ResetPasswordRequest) => {
      const { confirmPassword, ...rest } = data
      await mutation.mutateAsync(rest)
    }
  )

  return (
    <div className="flex h-[90%] flex-col justify-between overflow-y-hidden">
      <div className="flex flex-col gap-3">
        <h1 className="mb-10 text-black01 text-head6">
          새 비밀번호를 입력해 주세요
        </h1>
        <Password
          methods={methods}
          label=""
          mode="box"
          type="newPassword"
          isShownIcon
        />
        <ConfirmPassword
          methods={methods}
          mode="box"
          confirmName="newPassword"
          isShownIcon
        />
        {/* <Button
          disabled={!isNextEnabled}
          onClick={() => {
            console.log('done')
          }}
        >
          비밀번호 변경하기
        </Button> */}
      </div>

      <Button disabled={!isNextEnabled} onClick={handleDone}>
        다음
      </Button>
      <ResetPasswordModal opened={opened} closeModal={closeModal} />
    </div>
  )
}

const DoneStep = () => {
  const { push } = useFlow()
  const goSignin = () => {
    push('SigninPage', {})
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

      <Button onClick={goSignin}>로그인하러 가기</Button>
    </div>
  )
}
