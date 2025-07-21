import { Button } from '@yaksok/ui'
import { Modal } from '@yaksok/ui/modal'

export function ResetPasswordModal({
  opened,
  closeModal,
}: {
  opened: boolean
  closeModal: () => void
}) {
  return (
    <Modal opened={opened} hide={closeModal}>
      <Modal.Content>
        <h1 className="mb-9 whitespace-pre-line text-center text-body1">
          {'현재 비밀번호와 동일합니다.'}
        </h1>
        <Button onClick={closeModal} size="full">
          확인
        </Button>
      </Modal.Content>
    </Modal>
  )
}
