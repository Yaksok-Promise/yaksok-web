import * as React from 'react'
import type { SVGProps } from 'react'
const SvgApple = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M12.2043 9.63409L5.531 0H0V18H5.79574V8.36591L12.4679 18H18V0H12.2043V9.63409Z"
      fill="white"
    />
  </svg>
))
SvgApple.displayName = 'SvgApple'
export default SvgApple
