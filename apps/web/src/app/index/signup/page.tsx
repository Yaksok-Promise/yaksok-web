import SignupSteps from '@/components/signup/signup-steps'
import { useFunnel } from '@/hooks/use-funnel'
import { SignupRequest, SignupSchema } from '@/validation/zod'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { ChevronLeft } from '@yaksok/icons'
import { Header, If, PageSpy } from '@yaksok/ui'
import { ModalRoot } from '@yaksok/ui/modal'
import { cn } from '@yaksok/utils'
import { FormProvider, useForm } from 'react-hook-form'

const Steps = [
  'agreement',
  'id',
  'password',
  'phoneNumber',
  'sex',
  'birthDate',
  'name',
  'done',
]

export type StepsType = (typeof Steps)[number]

export default function SignupPage() {
  const { Funnel, Step, handleNext, handlePrev, currentStep } =
    useFunnel<StepsType>(Steps, 'agreement')

  const trackingSteps = Steps.slice(1, -1)
  const currentTrackingIdx = trackingSteps.findIndex(
    step => step === currentStep
  )

  const ifCondition = currentStep !== 'agreement' && currentStep !== 'done'
  const isDone = currentStep === 'done'

  const methods = useForm<SignupRequest>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
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
        <main className={cn('px-4 pt-10', { 'pt-0': isDone })}>
          <DevTool control={methods.control} />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <SignupSteps Funnel={Funnel} Step={Step} onNext={handleNext} />
            </form>
          </FormProvider>
        </main>
      </div>
      <ModalRoot />
    </AppScreen>
  )
}
