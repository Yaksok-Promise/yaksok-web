import { UnderConstructionBell } from '@yaksok/icons'

export function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-3">
      <UnderConstructionBell size={54} />
      <h6 className="text-body1 text-gray03">서비스 준비중입니다.</h6>
      <p className="whitespace-pre-line text-center text-caption1 text-gray06">
        {
          '보다 나은 서비스 제공을 위하여 준비중에 있습니다.\n빠른시일내에 준비하여 찾아뵙겠습니다.'
        }
      </p>
    </div>
  )
}
