import * as React from 'react'
import type { SVGProps } from 'react'
const SvgHamburger = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, stroke, ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M5 17.751H19M5 12.751H19M5 7.75098H19"
      stroke={stroke ? stroke : 'currentColor'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgHamburger.displayName = 'SvgHamburger'
export default SvgHamburger
