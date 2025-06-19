import * as React from 'react'
import type { SVGProps } from 'react'
const SvgHamburger = React.forwardRef<
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
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5 17.751h14m-14-5h14m-14-5h14"
    />
  </svg>
))
SvgHamburger.displayName = 'SvgHamburger'
export default SvgHamburger
