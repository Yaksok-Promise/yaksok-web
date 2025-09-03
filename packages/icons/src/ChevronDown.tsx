import * as React from 'react'
import type { SVGProps } from 'react'
const SvgChevronDown = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, stroke = '#959598', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g opacity={0.7}>
      <path
        d="M10.6673 6.66699L8.00065 9.33366L5.33398 6.66699"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
))
SvgChevronDown.displayName = 'SvgChevronDown'
export default SvgChevronDown
