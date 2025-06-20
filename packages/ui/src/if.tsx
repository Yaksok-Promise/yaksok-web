import React, { ReactElement } from 'react'

type IfProps = {
  condition: boolean
  children: ReactElement | ReactElement[]
}
export const If = ({ condition, children }: IfProps) => {
  if (condition) {
    return children
  }

  return null
}
