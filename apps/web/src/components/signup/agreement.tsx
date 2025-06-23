import { SignupRequest } from '@/validation/zod'
import {
  Agreement,
  AgreementItemContent,
  useAgreement,
} from '@yaksok/ui/agreement'
import { Button } from '@yaksok/ui/button'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AgreementItemId, StepPageProps } from './type'

type AgreementPageProps = Omit<StepPageProps, 'title'> & {
  itemList: AgreementItemContent<AgreementItemId>[]
  agreementHook: ReturnType<typeof useAgreement>
}

export default function AgreementPage({
  onNext,
  agreementHook,
  itemList,
}: AgreementPageProps) {
  const { setValue } = useFormContext<SignupRequest>()

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
