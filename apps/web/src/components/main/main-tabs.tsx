import { CardProps, Tabs, TabsProps } from '@yaksok/ui'
import { NotEmptyArray } from '@yaksok/utils'
import { MainSwiper } from './main-swiper'

export type MainTabsProps = {
  philData?: NotEmptyArray<CardProps>
  pharmacyData: NotEmptyArray<CardProps>
  eventData: NotEmptyArray<CardProps>
}

export default function MainTabs({
  philData,
  pharmacyData,
  eventData,
}: MainTabsProps) {
  const TabsData: TabsProps['tabInfo'] = [
    {
      value: 'recommend',
      label: '추천 제품',
      content: <MainSwiper />,
    },
    {
      value: 'pharmacy',
      label: '내 주변 약국 인기 제품',
      content: <MainSwiper data={pharmacyData} />,
    },
    {
      value: 'event',
      label: '이벤트',
      content: <MainSwiper data={eventData} />,
    },
  ]
  return <Tabs tabInfo={TabsData} />
}
