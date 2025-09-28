'use client'

import { useHttpMutation } from '@/hooks/tanstak/use-http-mutation'
import { useGetToken } from '@/hooks/use-get-token'
import { invalidateQueries } from '@/utils/query-client'
import { useFlow } from '@stackflow/react/future'
import { useQueryClient } from '@tanstack/react-query'
import { MagazineDetail } from '@yaksok/api/boardMagazineType'
import { Pencil, Share, Trash, TriangleWarning } from '@yaksok/icons'
import { useMagazineStore } from '@yaksok/store'
import { DropDown } from '@yaksok/ui'
import { useModal } from '@yaksok/ui/modal'
import { DeleteModal } from '../common/modal/delete-modal'

export type GeneralForumHeaderSelectProps = {
  isMine: boolean
  data: MagazineDetail
}

export function GeneralForumHeaderDropDown({
  isMine,
  data,
}: GeneralForumHeaderSelectProps) {
  // 각 버튼 기능 요소 정리 필요
  const { push, pop } = useFlow()
  const { openModal, closeModal, opened } = useModal()
  const token = useGetToken()
  const queryClient = useQueryClient()
  const deleteMutation = useHttpMutation(
    '/api/post/general-forum/{postId}',
    'delete',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        postId: data.id,
      },
    },
    {
      onSuccess: () => {
        invalidateQueries(queryClient, ['general-forum'])
        pop()
      },
    }
  )
  const { setCategory, setTags, setTitle, setPrevImages } = useMagazineStore()
  const _dropdownMenuList = isMine
    ? [
        {
          label: '수정',
          value: 'edit',
          render: <Pencil size={16} stroke="#018381" />,
          onClick: () => {
            setCategory('ALL') // 임시 지정
            setTags(data.tags)
            setTitle(data.title)
            setPrevImages(data.images)
            push('GeneralForumEditPage', {
              content: data.body,
              id: data.id,
            })
          },
        },
        {
          label: '삭제',
          value: 'delete',
          render: <Trash size={16} stroke="#018381" />,
          onClick: () => {
            openModal()
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
  return (
    <>
      <DropDown data={_dropdownMenuList} />
      <DeleteModal
        opened={opened}
        closeModal={closeModal}
        handleDelete={async () => {
          await deleteMutation.mutateAsync({})
        }}
      >
        <span>잠깐, 해당 게시글을 정말 삭제하시겠습니까?</span>
      </DeleteModal>
    </>
  )
}
