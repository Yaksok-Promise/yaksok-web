import { useStack } from '@stackflow/react'
import React, { useEffect } from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const stack = useStack()
  useEffect(() => {
    console.log(stack)
  }, [stack])
  return <div>{children}</div>
}
