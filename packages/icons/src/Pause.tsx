import * as React from 'react'
import type { SVGProps } from 'react'
const SvgPause = React.forwardRef<
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
    <rect x={10.6504} y={3.59961} width={2.25} height={10} fill="#E3E3E3" />
    <rect x={5.40039} y={3.59961} width={2.25} height={10} fill="#E3E3E3" />
  </svg>
))
SvgPause.displayName = 'SvgPause'
export default SvgPause
