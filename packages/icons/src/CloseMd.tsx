import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCloseMd = React.forwardRef<
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
      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
      stroke="#48484A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgCloseMd.displayName = 'SvgCloseMd'
export default SvgCloseMd
