import { cn } from '@yaksok/utils'
import { ComponentPropsWithoutRef, ElementType, SVGProps } from 'react'

export type BottomNavigationButtonProps = ComponentPropsWithoutRef<'button'> & {
  icon: React.ElementType<
    SVGProps<SVGSVGElement> & {
      size?: number | string
    }
  >
  title: string
  isActive: boolean
}
export function BottomNavigationButton({
  icon: Icon,
  title,
  isActive,
  onClick,
  className,
  ...props
}: BottomNavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      {...props}
      className={cn(
        'flex w-[55px] flex-col items-center justify-center gap-1.25 rounded-[12px] pt-1 text-bottom-navigation transition-colors',
        isActive && 'bg-[#C4C4C4]/10 text-gray02',
        !isActive && 'bg-white text-subGray01',
        className
      )}
    >
      <Icon
        size={24}
        stroke={isActive ? '#48484A' : '#C4C4C4'}
        strokeWidth={1.2}
      />
      {title}
    </button>
  )
}
