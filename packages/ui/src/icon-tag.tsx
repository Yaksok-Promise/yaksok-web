import { SvgIconElement } from '@yaksok/icons'
import { cn } from '@yaksok/utils'

export type IconTagProps = {
  icon: SvgIconElement
  label: string
  labelClassName?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}
export function IconTag({
  icon,
  label,
  labelClassName,
  className,
  onClick,
}: IconTagProps) {
  return (
    <div
      className={cn('flex items-center', className)}
      onClick={onClick}
      role="button"
    >
      {icon}
      <span className={cn('text-caption1 text-gray04', labelClassName)}>
        {label}
      </span>
    </div>
  )
}
