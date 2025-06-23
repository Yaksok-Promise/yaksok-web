import AgreementPage from '@/components/signup/agreement'
import Id from '@/components/signup/id'
import { useFunnel } from '@/hooks/use-funnel'
import { SignupRequest, SignupSchema } from '@/validation/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChevronLeft } from '@yaksok/icons'
import { useAgreement, AgreementItemContent } from '@yaksok/ui/agreement'
import { Header } from '@yaksok/ui/header'
import { If } from '@yaksok/ui/if'
import { PageSpy } from '@yaksok/ui/page-spy'
import { cn } from '@yaksok/utils'
import { FormProvider, useForm } from 'react-hook-form'

export type AgreementItemId =
  | 'age'
  | 'personal-info-agreement'
  | 'marketing-agreement'
  | 'service-agreement'
  | 'location-service'
  | 'push-notification'

const itemList: AgreementItemContent<AgreementItemId>[] = [
  {
    id: 'age',
    content: '만 14세 이상',
    isRequired: true,
  },
  {
    id: 'personal-info-agreement',
    content: '개인정보 수집 및 이용약관',
    showDetailButton: true,
    isRequired: true,
  },
  {
    id: 'location-service',
    content: '위치기반 서비스 이용약관',
    showDetailButton: true,
    isRequired: true,
  },
  {
    id: 'service-agreement',
    content: '서비스 이용약관',
    showDetailButton: true,
    isRequired: true,
  },
  {
    id: 'marketing-agreement',
    content: '마케팅 및 이벤트 활용 동의',
    showDetailButton: true,
  },
  {
    id: 'push-notification',
    content: '알림 수신 동의',
    showDetailButton: true,
  },
]

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
  })

  const onSubmit = (data: SignupRequest) => console.log(data)

  const agreementHook = useAgreement<AgreementItemId>(itemList)

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
                    itemList={itemList}
                  />
                </Step>
                <Step name="id">
                  <Id onNext={handleNext} />
                </Step>
                <Step name="password">비밀번호 기입</Step>
                <Step name="phoneNumber">전화번호</Step>
                <Step name="sex">성별</Step>
                <Step name="birthDate">생일</Step>
                <Step name="name">이름 기입</Step>
                <Step name="nickname">닉네임 기입</Step>
                <Step name="done">완료</Step>
              </Funnel>
            </form>
          </FormProvider>
        </main>
      </div>
    </AppScreen>
  )
}
