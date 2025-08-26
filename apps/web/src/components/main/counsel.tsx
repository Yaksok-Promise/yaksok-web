import { useFlow } from '@/utils/stackflow'
import { MiniQr } from '@yaksok/icons'
import { Badge, BadgeProps } from '@yaksok/ui'
import { NotEmptyArray } from '@yaksok/utils'

export default function Counsel() {
  const { push } = useFlow()
  const data: NotEmptyArray<BadgeProps> = [
    {
      variant: 'card',
      miniTitle: '약속 상담',
      title: '약사 상담',
      description: '영양제 고민, 복약 지도까지\n지금 약사와 상담해 보세요',
      onClick: () => alert('약사 복약 상담'),
    },
    {
      variant: 'promo',
      icon: <MiniQr size={20} />,
      title: '현장 결제',
      description: '약국에서 간편하게 결제',
      lineBackground: true,
      onClick: () => {
        push('PaymentBottomSheetActivity', {})
      },
    },
  ]
  return (
    <div className="flex flex-col gap-3 px-4">
      <h1 className="text-black01 text-head6">약속 상담</h1>
      <div className="flex gap-4">
        {data.map((props, index) => (
          <Badge key={index} {...props} />
        ))}
      </div>
    </div>
  )
}
