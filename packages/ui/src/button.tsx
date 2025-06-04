import { ReactNode } from 'react'
import { cn } from '../../utils/src/cn'

interface ButtonProps {
  children: ReactNode
  className?: string
  appName: string
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={cn(
        className,
        'h-10 w-10 border-[1px] border-red-500 text-[300px]'
      )}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  )
}
