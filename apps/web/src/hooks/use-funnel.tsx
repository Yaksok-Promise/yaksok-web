import { ReactElement, ReactNode, useState } from 'react'

export type StepProps<T extends string> = {
  name: T
  children: ReactNode
}
export type FunnelProps<T extends string> = {
  children: ReactElement<StepProps<T>>[]
}

export const useFunnel = <T extends string>(defaultStep: string) => {
  const [step, setStep] = useState<string>(defaultStep)

  // fragment 사용 이유는 JSX 반환 구조를 명시저으로 하기 위해 사용
  const Step = ({ children }: StepProps<T>) => {
    return <>{children}</>
  }

  const Funnel = ({ children }: FunnelProps<T>) => {
    const targetStep = children.find(
      childStep => childStep.props?.name === step
    )
    return <>{targetStep}</>
  }

  return { Funnel, Step, setStep, currentStep: step }
}
