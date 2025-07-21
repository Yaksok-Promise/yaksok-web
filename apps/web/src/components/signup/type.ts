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
