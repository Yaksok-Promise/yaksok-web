import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef } from 'react'

export type PageSpyProps = {
  totalLength: number
  currentIndex: number
} & ComponentPropsWithoutRef<'div'>

export const PageSpy = ({
  totalLength,
  currentIndex,
  className,
  ...props
}: PageSpyProps) => {
  const prcentage = ((currentIndex + 1) / totalLength) * 100
  console.log(prcentage)
  return (
    <div
      className="relative h-0.5 w-full overflow-hidden bg-gray06"
      role="page-spy"
    >
      <div
        className={cn(
          'absolute top-0 left-0 h-full bg-black01 transition-all duration-700 ease-in-out',
          className
        )}
        style={{ width: `${prcentage}%` }}
        {...props}
      ></div>
    </div>
  )
}
