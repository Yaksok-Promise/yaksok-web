import { FunnelProps, StepProps } from '@/hooks/use-funnel'
import { ComponentType } from 'react'
import {
  Id,
  Name,
  Password,
  PhoneNumber,
  Sex,
  SignupDone,
  Agreement,
  Birthdate,
} from '@/components/signup'
import { ITEM_LIST } from '@/components/signup/constant'
import { useAgreement } from '@yaksok/ui/agreement'
import { StepsType } from '@/app/index/signup/page'

export type SignupStepsProps = {
  Funnel: ComponentType<FunnelProps<StepsType>>
  Step: ComponentType<StepProps<StepsType>>
  onNext: () => void
}

export default function SignupSteps({
  Funnel,
  Step,
  onNext,
}: SignupStepsProps) {
  const agreementHook = useAgreement(ITEM_LIST)
  return (
    <Funnel>
      <Step name="agreement">
        <Agreement
          onNext={onNext}
          agreementHook={agreementHook as ReturnType<typeof useAgreement>}
          itemList={ITEM_LIST}
        />
      </Step>
      <Step name="id">
        <Id onNext={onNext} title="아이디를 입력해주세요." />
      </Step>
      <Step name="password">
        <Password onNext={onNext} title="비밀번호를 입력해주세요" />
      </Step>
      <Step name="phoneNumber">
        <PhoneNumber title="전화번호를 입력해주세요." onNext={onNext} />
      </Step>
      <Step name="sex">
        <Sex title="성별을 입력해주세요" onNext={onNext} />
      </Step>
      <Step name="birthDate">
        <Birthdate title="생년월일을 입력해 주세요" onNext={onNext} />
      </Step>
      <Step name="name">
        <Name title="이름을 입력해 주세요" onNext={onNext} />
      </Step>
      <Step name="done">
        <SignupDone />
      </Step>
    </Funnel>
  )
}
