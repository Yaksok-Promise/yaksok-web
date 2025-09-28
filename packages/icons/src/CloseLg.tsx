import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCloseLg = React.forwardRef<
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
      d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
      stroke="#48484A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgCloseLg.displayName = 'SvgCloseLg'
export default SvgCloseLg
