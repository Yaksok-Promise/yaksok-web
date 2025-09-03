import { useFlow } from '@/utils/stackflow'
import { Bell, BellNotification } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { SVGProps } from 'react'

export type NotificationProps = {
  isNotification?: boolean
  wrapperClassName?: string
  iconOption?: SVGProps<SVGSVGElement> & { size?: number | string }
}

export function Notification({
  wrapperClassName,
  iconOption,
  isNotification = false,
}: NotificationProps) {
  const { push } = useFlow()
  const handleClick = () => {}
  return (
    <div className={cn(wrapperClassName)}>
      <button onClick={handleClick}>
        {isNotification ? (
          <BellNotification {...iconOption} />
        ) : (
          <Bell {...iconOption} />
        )}
      </button>
    </div>
  )
}
