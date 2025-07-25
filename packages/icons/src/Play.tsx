import * as React from 'react'
import type { SVGProps } from 'react'
const SvgPlay = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M13.25 8.56699C13.5833 8.75944 13.5833 9.24056 13.25 9.43301L7.25 12.8971C6.91667 13.0896 6.5 12.849 6.5 12.4641L6.5 5.5359C6.5 5.151 6.91667 4.91044 7.25 5.10289L13.25 8.56699Z"
      fill="#E3E3E3"
    />
  </svg>
))
SvgPlay.displayName = 'SvgPlay'
export default SvgPlay
