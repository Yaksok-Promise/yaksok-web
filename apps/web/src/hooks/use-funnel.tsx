import { ReactElement, ReactNode, useMemo, useState } from 'react'

export type StepProps<T extends string> = {
  name: T
  children: ReactNode
}

export type FunnelProps<T extends string> = {
  children: ReactElement<StepProps<T>>[]
}

export function useFunnel<T extends string>(steps: T[], defaultStep: T) {
  const [currentStep, setStep] = useState<T>(defaultStep)

  const currentIdx = useMemo(
    () => steps.findIndex(step => step === currentStep),
    [steps, currentStep]
  )

  const handleNext = () => {
    if (currentIdx !== -1 && currentIdx < steps.length - 1) {
      setStep(steps[currentIdx + 1])
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setStep(steps[currentIdx - 1])
    }
  }

  const Step = ({ children }: StepProps<T>) => <>{children}</>

  const Funnel = ({ children }: FunnelProps<T>) => {
    const targetStep = children.find(child => child.props.name === currentStep)
    return <>{targetStep}</>
  }

  return {
    Funnel,
    Step,
    currentStep,
    handleNext,
    handlePrev,
  }
}
