import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCheck = React.forwardRef<
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
      d="m6 12 4.243 4.243 8.484-8.486"
    />
  </svg>
))
SvgCheck.displayName = 'SvgCheck'
export default SvgCheck
