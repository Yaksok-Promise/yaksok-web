import { ComponentPropsWithoutRef } from 'react'

export default function SignupTitle({
  children,
  ...props
}: ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1 className="mb-10 text-head5" {...props}>
      {children}
    </h1>
  )
}
