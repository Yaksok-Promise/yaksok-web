import { useCallback, useState } from 'react'

export const useModal = () => {
  const [opened, toggleModal] = useState(false)

  const openModal = useCallback(() => {
    toggleModal(true)
  }, [])

  const closeModal = useCallback(() => {
    toggleModal(false)
  }, [])

  return {
    opened,
    openModal,
    closeModal,
  }
}
