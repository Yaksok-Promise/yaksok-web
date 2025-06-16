import React from 'react'
import { ReactElement, ReactNode, useState } from 'react'

export type StepProps = {
  name: string
  children: ReactNode
}

export type FunnelProps = Array<ReactElement<StepProps>>

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState<string>(defaultStep)

  // fragment 사용 이유는 JSX 반환 구조를 명시저으로 하기 위해 사용
  const Step = ({ children }: StepProps) => {
    return <>{children}</>
  }

  const Funnel = ({ children }: { children: FunnelProps }) => {
    const targetStep = children.find(
      childStep => childStep.props?.name === step
    )
    return <>{targetStep}</>
  }

  return { Funnel, Step, setStep, currentStep: step }
}
