import { CardProps, Tabs, TabsProps } from '@yaksok/ui'
import { NotEmptyArray } from '@yaksok/utils'
import { MainCarousel } from './main-carousel'

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
      content: <MainCarousel />,
    },
    {
      value: 'pharmacy',
      label: '내 주변 약국 인기 제품',
      content: <MainCarousel data={pharmacyData} />,
    },
    {
      value: 'event',
      label: '이벤트',
      content: <MainCarousel data={eventData} />,
    },
  ]
  return <Tabs tabInfo={TabsData} />
}
