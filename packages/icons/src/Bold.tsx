import * as React from 'react'
import type { SVGProps } from 'react'
const SvgBold = React.forwardRef<
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
      d="M8 12H12.5M8 12V5H12.5C14.433 5 16 6.567 16 8.5C16 10.433 14.433 12 12.5 12M8 12V19H13.5C15.433 19 17 17.433 17 15.5C17 13.567 15.433 12 13.5 12H12.5"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H12.5M8 12V5H12.5C14.433 5 16 6.567 16 8.5C16 10.433 14.433 12 12.5 12M8 12V19H13.5C15.433 19 17 17.433 17 15.5C17 13.567 15.433 12 13.5 12H12.5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H12.5M8 12V5H12.5C14.433 5 16 6.567 16 8.5C16 10.433 14.433 12 12.5 12M8 12V19H13.5C15.433 19 17 17.433 17 15.5C17 13.567 15.433 12 13.5 12H12.5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H12.5M8 12V5H12.5C14.433 5 16 6.567 16 8.5C16 10.433 14.433 12 12.5 12M8 12V19H13.5C15.433 19 17 17.433 17 15.5C17 13.567 15.433 12 13.5 12H12.5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H12.5M8 12V5H12.5C14.433 5 16 6.567 16 8.5C16 10.433 14.433 12 12.5 12M8 12V19H13.5C15.433 19 17 17.433 17 15.5C17 13.567 15.433 12 13.5 12H12.5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 12H12.5M8 12V5H12.5C14.433 5 16 6.567 16 8.5C16 10.433 14.433 12 12.5 12M8 12V19H13.5C15.433 19 17 17.433 17 15.5C17 13.567 15.433 12 13.5 12H12.5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgBold.displayName = 'SvgBold'
export default SvgBold
