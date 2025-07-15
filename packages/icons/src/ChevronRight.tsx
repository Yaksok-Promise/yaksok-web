import * as React from 'react'
import type { SVGProps } from 'react'
const SvgChevronRight = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M13.334 10.667L18.6673 16.0003L13.334 21.3337"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgChevronRight.displayName = 'SvgChevronRight'
export default SvgChevronRight
