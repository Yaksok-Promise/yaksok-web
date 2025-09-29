import * as React from 'react'
import type { SVGProps } from 'react'
const SvgTextAlignCenter = React.forwardRef<
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
      d="M17 18H7M20 14H4M17 10H7M20 6H4"
      stroke="#48484A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 18H7M20 14H4M17 10H7M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 18H7M20 14H4M17 10H7M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 18H7M20 14H4M17 10H7M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 18H7M20 14H4M17 10H7M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 18H7M20 14H4M17 10H7M20 6H4"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgTextAlignCenter.displayName = 'SvgTextAlignCenter'
export default SvgTextAlignCenter
