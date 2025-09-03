import { Tag as TagType } from '@yaksok/api/commentType'
import { cn } from '@yaksok/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

const tagVariants = cva(
  'flex items-center justify-center rounded-[4px] bg-gray03/40 px-1.5 py-0.5',
  {
    variants: {
      size: {
        full: 'w-full',
        fit: 'w-fit',
      },
    },
    defaultVariants: {
      size: 'fit',
    },
  }
)

export type TagProps = Omit<ComponentPropsWithoutRef<'div'>, 'prefix'> &
  VariantProps<typeof tagVariants> & {
    tag: TagType
    prefix?: ReactNode
  }

export function Tag({
  tag,
  className,
  prefix = <span className="text-gray03 text-subHead3">#</span>,
  size = 'fit',
  ...props
}: TagProps) {
  const label = tag.name
  return (
    <div className={cn(tagVariants({ size }), className)} {...props}>
      {prefix}
      <span className="text-gray03 text-subHead3">{label}</span>
    </div>
  )
}
