import { FunnelProps, StepProps } from '@/hooks/use-funnel'
import { ComponentType } from 'react'

export type SignupStepsProps = {
  steps: string[]
  Funnel: ComponentType<FunnelProps>
  Step: ComponentType<StepProps>
  onNext: () => void
}

export default function SignupSteps() {
  return <div>signup-steps</div>
}
