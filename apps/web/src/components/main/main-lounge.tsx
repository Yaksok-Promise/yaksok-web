import ExImg from '@/assets/ex.png'
import { CardProps } from '@yaksok/ui'
import { NotEmptyArray } from '@yaksok/utils'
import MainTabs from './main-tabs'

export function MainLounge() {
  const philData: NotEmptyArray<CardProps> = [
    {
      imgSrc: ExImg,
      imgAlt: 'ex',
      imgFallbackSrc: ExImg,
      title: '비맥스 메타정',
      classification: '멀티비티민',
      description:
        '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
      brand: 'GC녹십자',
    },
    {
      imgSrc: ExImg,
      imgAlt: 'ex',
      imgFallbackSrc: ExImg,
      title: '비맥스 메타정',
      classification: '멀티비티민',
      description:
        '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
      brand: 'GC녹십자',
    },
    {
      imgSrc: ExImg,
      imgAlt: 'ex',
      imgFallbackSrc: ExImg,
      title: '비맥스 메타정',
      classification: '멀티비티민',
      description:
        '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
      brand: 'GC녹십자',
    },
    {
      imgSrc: ExImg,
      imgAlt: 'ex',
      imgFallbackSrc: ExImg,
      title: '비맥스 메타정',
      classification: '멀티비티민',
      description:
        '음식만으론 부족한 필수 영양소,\n 멀티비타민으로 간편하게 채워보세요.',
      brand: 'GC녹십자',
    },
  ]
  const pharmacyData: NotEmptyArray<CardProps> = [...philData]
  const eventData: NotEmptyArray<CardProps> = [...philData]
  return (
    <div className="mt-14.5 flex flex-col gap-4">
      <h1 className="text-head6">김약속님을 위한 약속 Lounge</h1>
      <MainTabs
        philData={philData}
        pharmacyData={pharmacyData}
        eventData={eventData}
      />
    </div>
  )
}
