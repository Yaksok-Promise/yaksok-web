import { cn } from '@yaksok/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode
    rounded?: 'full' | 'md'
    size?: 'full' | 'fit'
  }

const buttonVariants = cva(
  'inline-flex py-[12px] text-gray9 font-bold items-center clickable justify-center gap-2 whitespace-nowrap transition-all disabled:pointer-events-none',
  {
    variants: {
      rounded: {
        full: 'rounded-full',
        md: 'rounded-[8px]',
      },
      variant: {
        default:
          'bg-black01 text-subhead1 text-white disabled:bg-gray06 disabled:text-gray05',
      },
      size: {
        full: 'w-full',
        fit: 'w-fit px-[12px] py-[3.5px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'full',
      rounded: 'md',
    },
  }
)

function Button({
  className,
  variant,
  size,
  children,
  rounded,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className, rounded }))}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button, buttonVariants }
