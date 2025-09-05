import * as React from 'react'
import type { SVGProps } from 'react'
const SvgArrowRight = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, stroke = 'white', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M1.5 7H16.5M16.5 7L10.5 1M16.5 7L10.5 13"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgArrowRight.displayName = 'SvgArrowRight'
export default SvgArrowRight
