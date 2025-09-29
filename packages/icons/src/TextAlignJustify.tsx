import * as React from 'react'
import type { SVGProps } from 'react'
const SvgTextAlignJustify = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, stroke = 'black', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M20 18H4M20 14H4M20 10H4M20 6H4"
      stroke="#48484A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 18H4M20 14H4M20 10H4M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 18H4M20 14H4M20 10H4M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 18H4M20 14H4M20 10H4M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 18H4M20 14H4M20 10H4M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 18H4M20 14H4M20 10H4M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgTextAlignJustify.displayName = 'SvgTextAlignJustify'
export default SvgTextAlignJustify
