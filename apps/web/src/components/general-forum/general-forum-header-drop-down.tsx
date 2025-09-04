'use client'

import { useFlow } from '@stackflow/react/future'
import { Pencil, Share, Trash, TriangleWarning } from '@yaksok/icons'
import { DropDown } from '@yaksok/ui'

export type GeneralForumHeaderSelectProps = {
  isMine: boolean
}

export function GeneralForumHeaderDropDown({
  isMine,
}: GeneralForumHeaderSelectProps) {
  // 각 버튼 기능 요소 정리 필요
  const { push } = useFlow()
  const _dropdownMenuList = isMine
    ? [
        {
          label: '수정',
          value: 'edit',
          render: <Pencil size={16} stroke="#018381" />,
          onClick: () => {
            alert('수정')
          },
        },
        {
          label: '삭제',
          value: 'delete',
          render: <Trash size={16} stroke="#018381" />,
          onClick: () => {
            alert('삭제')
          },
        },
      ]
    : [
        {
          label: '공유',
          value: 'share',
          render: <Share size={16} stroke="#018381" />,
          onClick: () => {
            alert('공유')
          },
        },
        {
          label: '신고',
          value: 'report',
          render: <TriangleWarning size={16} stroke="#018381" />,
          onClick: () => {
            alert('신고')
          },
        },
      ]
  return <DropDown data={_dropdownMenuList} />
}
