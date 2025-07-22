import {
  Name,
  PhoneNumber,
  PhoneNumberModal,
  SignupModal,
  SmsCodeInput,
} from '@/components/common'
import { useFunnel } from '@/hooks/use-funnel'
import { useHttpMutation } from '@/hooks/use-http-mutation'
import useSmscodeInput from '@/hooks/use-smscode-input'
import { useFlow } from '@/utils/stackflow'
import { FindIdRequest, FindIdSchema, emailRegex } from '@/validation/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FindIdRequest as FindIdRequestType,
  FindIdResponse,
} from '@yaksok/api/userType'
import { Button, TextField } from '@yaksok/ui'
import { ModalRoot, useModal } from '@yaksok/ui/modal'
import { Dispatch, SetStateAction, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

const IdSteps = ['id', 'done']

export type IdStepsType = (typeof IdSteps)[number]

export default function FindId() {
  const { Funnel, Step, handleNext } = useFunnel<IdStepsType>(IdSteps, 'id')
  const [findId, setFindId] = useState<string | null>(null)

  const methods = useForm<FindIdRequest>({
    resolver: zodResolver(FindIdSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: FindIdRequest) => console.log(data)
  return (
    <main className="h-full overflow-y-hidden">
      <FormProvider {...methods}>
        <form className="h-full" onSubmit={methods.handleSubmit(onSubmit)}>
          <Funnel>
            <Step name="id">
              <IdStep onNext={handleNext} setFindId={setFindId} />
            </Step>
            <Step name="done">
              <DoneStep findId={findId} />
            </Step>
          </Funnel>
        </form>
      </FormProvider>
      <ModalRoot />
    </main>
  )
}

const IdStep = ({
  onNext,
  setFindId,
}: {
  onNext: () => void
  setFindId: Dispatch<SetStateAction<string | null>>
}) => {
  const methods = useFormContext<FindIdRequest>()
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

  const {
    openModal: openSignupModal,
    closeModal: closeSignupModal,
    opened: isOpenSignupModal,
  } = useModal()

  const mutation = useHttpMutation<FindIdRequestType, FindIdResponse>(
    '/api/user/find/id',
    'post',
    undefined,
    {
      onSuccess: data => {
        console.log(data)
        setFindId(data.loginId)
        onNext()
      },
      onError: () => {
        openSignupModal()
      },
    }
  )

  const handleCloseSignupModal = () => {
    methods.reset()
    closeSignupModal()
  }

  const findId = async () => {
    await mutation.mutateAsync({
      name: methods.getValues('name'),
      phoneNumber: methods.getValues('phoneNumber'),
    })
  }

  return (
    <div className="flex h-full flex-col justify-between pb-20">
      <div className="flex flex-col gap-3">
        <h1 className="mb-10 text-black01 text-head6">
          가입시 등록한 정보를 입력해 주세요
        </h1>
        <Name methods={methods} />
        <PhoneNumber
          methods={methods}
          smsType="FIND_ID"
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
              smsType="FIND_ID"
            />
          </div>
        )}
      </div>
      <Button disabled={!isSuccess} onClick={findId} className="">
        다음
      </Button>
      <SignupModal
        opened={isOpenSignupModal}
        closeModal={handleCloseSignupModal}
      />
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

const DoneStep = ({ findId }: { findId: string | null }) => {
  const { replace } = useFlow()
  const handleFindPassword = () => {
    replace('FindIdPassword', {
      mode: 'password',
    })
  }
  const handleSignin = () => {
    replace('SigninPage', {})
  }
  return (
    <div className="flex h-full flex-col justify-between overflow-y-hidden pt-7.5 pb-20">
      <div className="flex flex-col gap-10">
        <h1 className="text-black01 text-head6">홍길동님의 아이디에요</h1>
        <TextField
          value={findId as string}
          disabled
          label=""
          message={{}}
          regex={emailRegex}
          mode="box"
          className="bg-gray06 text-black01 text-body2"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <Button size="full" mode="line" onClick={handleFindPassword}>
          비밀번호 찾기
        </Button>
        <Button size="full" onClick={handleSignin}>
          이 아이로 로그인
        </Button>
      </div>
    </div>
  )
}
