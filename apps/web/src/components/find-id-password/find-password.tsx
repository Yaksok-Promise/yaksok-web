import { useFunnel } from '@/hooks/use-funnel'

const PasswordSteps = ['certification', 'changePassword', 'done']

export type PasswordStepsType = (typeof PasswordSteps)[number]

export default function FindPassword() {
  const { Funnel, Step, handleNext, handlePrev } = useFunnel<PasswordStepsType>(
    PasswordSteps,
    PasswordSteps[0]
  )

  return <div></div>
}
