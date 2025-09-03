export * from './phonenumber-modal'
export * from './signup-modal'
export * from './reset-password-modal'
export * from './logout-modal'
export * from './quit-modal'

export type ModalProps = {
  opened: boolean
  closeModal: () => void
}
