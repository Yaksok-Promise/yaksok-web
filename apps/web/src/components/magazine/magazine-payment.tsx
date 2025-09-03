import { useFlow } from '@stackflow/react/future'
import { MiniQr } from '@yaksok/icons'
import { Tile } from '@yaksok/ui'

export default function MagazinePayment() {
  const { push } = useFlow()
  const openPurchase = () => {
    push('PaymentBottomSheetActivity', {})
  }

  return (
    <div className="mt-11">
      <Tile
        icon={<MiniQr size={32} />}
        iconBg="black"
        title="현장 결제"
        description="약국에서 상담부터 결제까지 한번에"
        onClick={openPurchase}
        className="rounded-[12px] px-6 py-5 shadow-card-ui"
      />
    </div>
  )
}
