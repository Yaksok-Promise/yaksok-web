import { Bedge, BedgeProps } from '@yaksok/ui'
import { NotEmptyArray } from '@yaksok/utils'

export default function Counsel() {
  const data: NotEmptyArray<BedgeProps> = [
    {
      miniTitle: '하루 20명 선착순',
      title: '약사 복약 상담',
      description: '약에 대한 고민,\n 전문 약사와 상담해 보세요',
      onClick: () => alert('약사 복약 상담'),
    },
    {
      miniTitle: 'Beta',
      title: 'AI 복약 상담',
      description: '간단한 복약 고민,\n AI와 상담해 보세요',
      onClick: () => alert('AI 복약 상담'),
    },
  ]
  return (
    <div className="flex flex-col gap-3 px-4">
      <h1 className="text-black01 text-head6">약속 상담</h1>
      <div className="flex gap-4">
        {data.map((props, index) => (
          <Bedge key={index} {...props} />
        ))}
      </div>
    </div>
  )
}
