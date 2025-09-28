import { CloseSm } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef, ReactNode, SyntheticEvent } from 'react'
import { createPortal } from 'react-dom'

export type ModalProps = {
  children: ReactNode
  hide: () => void
  opened: boolean
}

export const Modal = ({ hide, opened, children }: ModalProps) => {
  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation()
  return createPortal(
    opened ? (
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-10 flex items-center justify-center bg-black01/10 backdrop-blur-[2px]"
        onClick={hide}
      >
        <div
          className="flex min-w-75 flex-col items-center justify-center rounded-[16px] bg-white01 p-5 text-black01"
          onClick={stopPropagation}
        >
          {children}
        </div>
      </div>
    ) : null,
    document.getElementById('modalRoot')
      ? document.getElementById('modalRoot')!
      : document.querySelector('div')!
  )
}

const ModalContent = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

export type ModalHeaderProps = {
  hide: () => void
} & ComponentPropsWithoutRef<'div'>

const ModalHeader = ({
  hide,
  children,
  className,
  ...props
}: ModalHeaderProps) => {
  return (
    <div
      className={cn(
        'mb-2 flex w-full items-center justify-end bg-white01',
        className
      )}
      {...props}
    >
      {children}
      <button onClick={hide} className="text-center">
        <CloseSm size={30} />
      </button>
    </div>
  )
}

const ModalFooter = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>
}
Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Footer = ModalFooter
