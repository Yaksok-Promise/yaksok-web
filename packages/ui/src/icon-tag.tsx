import { SvgIconElement } from '@yaksok/icons'
import { cn } from '@yaksok/utils'

export type IconTagProps = {
  icon: SvgIconElement
  label: string
  labelClassName?: string
  className?: string
}
export function IconTag({
  icon,
  label,
  labelClassName,
  className,
}: IconTagProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {icon}
      <span className={cn('text-caption1 text-gray04', labelClassName)}>
        {label}
      </span>
    </div>
  )
}
