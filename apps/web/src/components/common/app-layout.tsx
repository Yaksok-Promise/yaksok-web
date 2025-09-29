import { useActivity, useStack } from '@stackflow/react'
import React, { useEffect } from 'react'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const stack = useStack()
  const activitty = useActivity()
  useEffect(() => {
    console.log(stack)
    console.log(activitty)
  }, [stack, activitty])
  return <div>{children}</div>
}
