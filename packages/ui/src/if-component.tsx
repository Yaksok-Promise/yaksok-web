import { ReactElement } from 'react'

export type IfProps = {
  condition: boolean
  children: ReactElement | ReactElement[]
}
export const If = ({ condition, children }: IfProps) => {
  if (condition) {
    return children
  }

  return null
}
