import { useFlow } from '@/utils/stackflow'
import { Button, Checkbox } from '@yaksok/ui'
import { Modal } from '@yaksok/ui/modal'
import { useState } from 'react'
import { ModalProps } from '.'

export function QuitModal({ closeModal, opened }: ModalProps) {
  const [isCheck, setIsCheck] = useState(false)
  const { push } = useFlow()
  const goSignin = () => {
    closeModal()
    push('SigninPage', {
      title: '로그인',
    })
  }

  return (
    <Modal opened={opened} hide={closeModal}>
      <Modal.Content>
        <h1 className="mb-4 whitespace-pre-line text-center text-head6">
          {'정말 탈퇴 하시나요?'}
        </h1>
        <p className="mb-4 whitespace-pre-line text-center text-body1">{`탈퇴 시 계정 정보와 이용 내역이\n 모두 삭제되며, 복구가 어렵습니다.`}</p>
        <div
          className="mb-9 flex items-center gap-2"
          onClick={() => setIsCheck(!isCheck)}
        >
          <Checkbox checked={isCheck} setChecked={setIsCheck} theme="square" />
          <span className="text-body2">네, 탈퇴할게요</span>
        </div>

        <Button onClick={goSignin} disabled={!isCheck} size="full">
          확인
        </Button>
      </Modal.Content>
    </Modal>
  )
}
