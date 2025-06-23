import { useFunnel } from '@/hooks/use-funnel'
import { Header } from '@yaksok/ui/header'
import { PageSpy } from '@yaksok/ui/page-spy'
import { If } from '@yaksok/ui/if'
import { ChevronLeft } from '@yaksok/icons'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { SignupRequest, SignupSchema } from '@/validation/zod'
import Agreement from '@/components/signup/agreement'
import { cn } from '@yaksok/utils'
import { useEffect } from 'react'

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
                  <Agreement onNext={handleNext} />
                </Step>
                <Step name="id">아이디 기입</Step>
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
