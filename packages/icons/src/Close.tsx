import * as React from 'react'
import type { SVGProps } from 'react'
const SvgClose = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M20 20L15 15M15 15L10 10M15 15L20 10M15 15L10 20"
      stroke="#48484A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 20L15 15M15 15L10 10M15 15L20 10M15 15L10 20"
      stroke="currentColor"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 20L15 15M15 15L10 10M15 15L20 10M15 15L10 20"
      stroke="currentColor"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 20L15 15M15 15L10 10M15 15L20 10M15 15L10 20"
      stroke="currentColor"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 20L15 15M15 15L10 10M15 15L20 10M15 15L10 20"
      stroke="currentColor"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 20L15 15M15 15L10 10M15 15L20 10M15 15L10 20"
      stroke="currentColor"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgClose.displayName = 'SvgClose'
export default SvgClose
