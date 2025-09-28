import { Button } from '@yaksok/ui'
import { Modal } from '@yaksok/ui/modal'
import { ModalProps } from '.'

export type DeleteModalProps = ModalProps & {
  children: React.ReactNode
  handleDelete: () => void
}

export const DeleteModal = ({
  closeModal,
  opened,
  children,
  handleDelete,
}: DeleteModalProps) => {
  const onDelete = () => {
    handleDelete()
    closeModal()
  }
  return (
    <Modal opened={opened} hide={closeModal}>
      <Modal.Header hide={closeModal} />
      <Modal.Content>
        <h1 className="mb-[35px] flex">{children}</h1>
        <Button onClick={onDelete} size="full">
          확인
        </Button>
      </Modal.Content>
    </Modal>
  )
}
