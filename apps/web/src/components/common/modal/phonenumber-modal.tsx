import { Button } from '@yaksok/ui'
import { Modal } from '@yaksok/ui/modal'
import { ModalProps } from '.'

export type PhoneNumberModalProps = ModalProps & {
  title: string
}

export const PhoneNumberModal = ({
  closeModal,
  opened,
  title,
}: PhoneNumberModalProps) => {
  return (
    <Modal opened={opened} hide={closeModal}>
      <Modal.Content>
        <h1 className="mb-[35px] text-body1">{title}</h1>
        <Button onClick={closeModal} size="full">
          확인
        </Button>
      </Modal.Content>
    </Modal>
  )
}
