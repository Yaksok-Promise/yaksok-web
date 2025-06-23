import { SignupRequest } from '@/validation/zod'
import {
  AgreementItemContent,
  useAgreement,
  Agreement,
} from '@yaksok/ui/agreement'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@yaksok/ui/button'

type AgreementItemId =
  | 'age'
  | 'personal-info-agreement'
  | 'marketing-agreement'
  | 'service-agreement'
  | 'location-service'
  | 'push-notification'

export type StepPageProps = {
  onNext: () => void
}
export default function AgreementPage({ onNext }: StepPageProps) {
  const { setValue } = useFormContext<SignupRequest>()
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
  const agreementHook = useAgreement(itemList)
  const { itemsChecked, isAllRequiredAgreementChecked } = agreementHook

  const agreedAlarmValue = itemsChecked['push-notification']
  const agreedMarketingValue = itemsChecked['marketing-agreement']

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setValue('agreedAlarm', agreedAlarmValue)
    setValue('agreedMarketing', agreedMarketingValue)
  }, [agreedMarketingValue, agreedAlarmValue])

  return (
    <div className="mt-12.5">
      <div className="mb-40">
        <h1 className="text-head5">약속 서비스 이용을 위해</h1>
        <h1 className="text-head5">아래의 약관 동의가 필요해요</h1>
      </div>
      <div>
        <Agreement itemList={itemList} agreementHook={agreementHook} />
        <Button
          rounded="md"
          className="mt-10"
          disabled={!isAllRequiredAgreementChecked}
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </div>
  )
}
