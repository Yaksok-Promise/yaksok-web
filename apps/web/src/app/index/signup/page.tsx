import AgreementPage from '@/components/signup/agreement'
import BirthDate from '@/components/signup/birthdate'
import { ITEM_LIST } from '@/components/signup/constant'
import Id from '@/components/signup/id'
import Name from '@/components/signup/name'
import NickName from '@/components/signup/nickname'
import Password from '@/components/signup/password'
import Phonenumber from '@/components/signup/phonenumber'
import Sex from '@/components/signup/sex'
import { useFunnel } from '@/hooks/use-funnel'
import { SignupRequest, SignupSchema } from '@/validation/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChevronLeft } from '@yaksok/icons'
import { useAgreement } from '@yaksok/ui/agreement'
import { Header } from '@yaksok/ui/header'
import { If } from '@yaksok/ui/if'
import { PageSpy } from '@yaksok/ui/page-spy'
import { cn } from '@yaksok/utils'
import { FormProvider, useForm } from 'react-hook-form'

export default function SignupPage() {
  const Steps = [
    'agreement',
    'id',
    'password',
    'phoneNumber',
    'sex',
    'birthDate',
    'name',
    'nickname',
    'done',
  ] as const

  const { Funnel, Step, setStep, currentStep } = useFunnel<
    (typeof Steps)[number]
  >(Steps[0])

  const trackingSteps = Steps.slice(1, -1)
  const currentTrackingIdx = trackingSteps.findIndex(
    step => step === currentStep
  )

  const currentIdx = Steps.findIndex(step => step === currentStep)

  const handleNext = () => {
    if (currentIdx !== -1 && currentIdx < Steps.length)
      setStep(Steps[currentIdx + 1])
  }

  const handlePrev = () => {
    if (currentIdx < Steps.length && currentIdx > 0)
      setStep(Steps[currentIdx - 1])
  }

  const ifCondition = currentStep !== 'agreement' && currentStep !== 'done'

  const methods = useForm<SignupRequest>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: SignupRequest) => console.log(data)

  const agreementHook = useAgreement(ITEM_LIST)

  return (
    <AppScreen>
      <If condition={ifCondition}>
        <Header.Container>
          <Header.Left onClick={handlePrev}>
            <ChevronLeft />
          </Header.Left>
          <Header.Title>회원가입</Header.Title>
        </Header.Container>
      </If>
      <div
        className={cn({
          'mt-0': !ifCondition,
          'mt-13': ifCondition,
        })}
      >
        <If condition={ifCondition}>
          <PageSpy
            currentIndex={currentTrackingIdx}
            totalLength={trackingSteps.length}
          />
        </If>
        <main className="px-4 pt-10">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Funnel>
                <Step name="agreement">
                  <AgreementPage
                    onNext={handleNext}
                    agreementHook={
                      agreementHook as ReturnType<typeof useAgreement>
                    }
                    itemList={ITEM_LIST}
                  />
                </Step>
                <Step name="id">
                  <Id onNext={handleNext} title="아이디를 입력해주세요." />
                </Step>
                <Step name="password">
                  <Password
                    onNext={handleNext}
                    title="비밀번호를 입력해주세요"
                  />
                </Step>
                <Step name="phoneNumber">
                  <Phonenumber
                    title="전화번호를 입력해주세요."
                    onNext={handleNext}
                  />
                </Step>
                <Step name="sex">
                  <Sex title="성별을 입력해주세요" onNext={handleNext} />
                </Step>
                <Step name="birthDate">
                  <BirthDate
                    title="생년월일을 입력해 주세요"
                    onNext={handleNext}
                  />
                </Step>
                <Step name="name">
                  <Name title="이름을 입력해 주세요" onNext={handleNext} />
                </Step>
                <Step name="nickname">
                  <NickName
                    title="닉네임을 입력해 주세요"
                    onNext={handleNext}
                  />
                </Step>
                <Step name="done">완료</Step>
              </Funnel>
            </form>
          </FormProvider>
        </main>
      </div>
    </AppScreen>
  )
}
