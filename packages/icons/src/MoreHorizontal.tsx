import * as React from 'react'
import type { SVGProps } from 'react'
const SvgMoreHorizontal = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, stroke = 'white', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M17 12.751C17 13.3033 17.4477 13.751 18 13.751C18.5523 13.751 19 13.3033 19 12.751C19 12.1987 18.5523 11.751 18 11.751C17.4477 11.751 17 12.1987 17 12.751Z"
      fill={stroke}
    />
    <path
      d="M11 12.751C11 13.3033 11.4477 13.751 12 13.751C12.5523 13.751 13 13.3033 13 12.751C13 12.1987 12.5523 11.751 12 11.751C11.4477 11.751 11 12.1987 11 12.751Z"
      fill={stroke}
    />
    <path
      d="M5 12.751C5 13.3033 5.44772 13.751 6 13.751C6.55228 13.751 7 13.3033 7 12.751C7 12.1987 6.55228 11.751 6 11.751C5.44772 11.751 5 12.1987 5 12.751Z"
      fill={stroke}
    />
    <path
      d="M17 12.751C17 13.3033 17.4477 13.751 18 13.751C18.5523 13.751 19 13.3033 19 12.751C19 12.1987 18.5523 11.751 18 11.751C17.4477 11.751 17 12.1987 17 12.751Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 12.751C11 13.3033 11.4477 13.751 12 13.751C12.5523 13.751 13 13.3033 13 12.751C13 12.1987 12.5523 11.751 12 11.751C11.4477 11.751 11 12.1987 11 12.751Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12.751C5 13.3033 5.44772 13.751 6 13.751C6.55228 13.751 7 13.3033 7 12.751C7 12.1987 6.55228 11.751 6 11.751C5.44772 11.751 5 12.1987 5 12.751Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgMoreHorizontal.displayName = 'SvgMoreHorizontal'
export default SvgMoreHorizontal
