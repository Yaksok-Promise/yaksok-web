import { SignupRequest } from '@/validation/zod'
import { UseFormReturn } from 'react-hook-form'

export type StepPageProps = {
  onNext: () => void
  title: string
}

export type AgreementItemId =
  | 'age'
  | 'personal-info-agreement'
  | 'marketing-agreement'
  | 'service-agreement'
  | 'location-service'
  | 'push-notification'

export interface WithFormContext extends StepPageProps {
  methods: UseFormReturn<SignupRequest>
}
