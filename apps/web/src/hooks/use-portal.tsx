import { useEffect, useRef, useState } from 'react'

const ID = 'portal'

export function usePortal() {
  const portalRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    portalRef.current = document.getElementById(ID) as HTMLDivElement
  })
  return { portalRef, isOpen, setIsOpen }
}

export function Portal() {
  return <div id={ID} className="pointer-events-auto relative" />
}
