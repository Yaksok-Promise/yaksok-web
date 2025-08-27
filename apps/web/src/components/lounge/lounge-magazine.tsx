import MagazineLogo from '@/assets/magazine-logo.png'
import { useFlow } from '@/utils/stackflow'
import { Fallbackimg } from '@yaksok/ui'

export default function LoungeMagazine() {
  return (
    <div className="mt-14 flex flex-col gap-4">
      <h3 className="text-black01 text-head6">약속 메거진</h3>
      <MagazineCard />
    </div>
  )
}

const MagazineCard = () => {
  const goInstagram = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    //https://www.instagram.com/yakin_mag?igsh=a2NxM2phMmx2bHF0
    console.log('goInstagram')
  }
  const { push } = useFlow()

  const goLoungeDetail = () => {
    push('MagazinePage', {})
  }
  return (
    <div
      className="flex flex-col rounded-[12px] bg-black01 p-5"
      role="button"
      onClick={goLoungeDetail}
    >
      <Fallbackimg
        src={MagazineLogo}
        alt="메거진 로고"
        fallbackSrc={MagazineLogo}
        wrapperClassName="w-[89px] h-[26px] mb-3"
      />
      <span className="mb-1 text-gray07 text-subhead3">
        약사가 알려주는 의약·웰빙·라이프스타일의 모든 것
      </span>
      <span
        className="text-caption1 text-gray06 underline"
        role="button"
        onClick={goInstagram}
      >
        인스타그램에서 보기
      </span>
    </div>
  )
}
