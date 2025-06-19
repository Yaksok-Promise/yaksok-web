import * as React from 'react'
import type { SVGProps } from 'react'
const SvgPause = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 20 20"
    ref={ref}
    {...props}
  >
    <path fill="#E3E3E3" d="M10.65 3.6h2.25v10h-2.25zM5.4 3.6h2.25v10H5.4z" />
  </svg>
))
SvgPause.displayName = 'SvgPause'
export default SvgPause
