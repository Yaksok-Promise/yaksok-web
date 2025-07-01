import { AgreementItemContent } from '@yaksok/ui/agreement'
import { AgreementItemId } from './type'

export const ITEM_LIST: AgreementItemContent<AgreementItemId>[] = [
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
