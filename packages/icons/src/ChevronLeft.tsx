import * as React from 'react'
import type { SVGProps } from 'react'
const SvgChevronLeft = React.forwardRef<
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
    ref={ref}
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m15 20.727-7-7 7-7"
    />
  </svg>
))
SvgChevronLeft.displayName = 'SvgChevronLeft'
export default SvgChevronLeft
