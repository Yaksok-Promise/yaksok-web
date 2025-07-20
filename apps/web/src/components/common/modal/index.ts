export * from './phonenumber-modal'
export * from './signup-modal'

export type ModalProps = {
  opened: boolean
  closeModal: () => void
}
