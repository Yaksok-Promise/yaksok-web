import * as React from 'react'
import type { SVGProps } from 'react'
const SvgUnderline = React.forwardRef<
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
      d="M6 19H18M8 5V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V5"
      stroke="#48484A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 19H18M8 5V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 19H18M8 5V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 19H18M8 5V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 19H18M8 5V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 19H18M8 5V11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11V5"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgUnderline.displayName = 'SvgUnderline'
export default SvgUnderline
