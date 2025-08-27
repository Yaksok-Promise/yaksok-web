import { useFlow } from '@/utils/stackflow'
import { LoungeTitle } from './lounge-magazine-title'

export default function LoungeMagazine() {
  return (
    <div className="mt-14 flex flex-col gap-4">
      <h3 className="text-black01 text-head6">약속 메거진</h3>
      <MagazineCard />
    </div>
  )
}

const MagazineCard = () => {
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
      <LoungeTitle />
    </div>
  )
}
