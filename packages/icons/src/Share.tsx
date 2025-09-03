import * as React from 'react'
import type { SVGProps } from 'react'
const SvgShare = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, stroke = 'black', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M13 10L16 7M16 7L19 10M16 7V17M11.0002 14C10.0683 14 9.60241 14 9.23486 14.1522C8.74481 14.3552 8.35523 14.7448 8.15224 15.2349C8 15.6024 8 16.0681 8 17V21.8C8 22.9201 8 23.4798 8.21799 23.9076C8.40973 24.2839 8.71547 24.5905 9.0918 24.7822C9.5192 25 10.079 25 11.1969 25H20.8036C21.9215 25 22.4805 25 22.9079 24.7822C23.2842 24.5905 23.5905 24.2839 23.7822 23.9076C24 23.4802 24 22.921 24 21.8031V17C24 16.0681 23.9999 15.6024 23.8477 15.2349C23.6447 14.7448 23.2554 14.3552 22.7654 14.1522C22.3978 14 21.9319 14 21 14"
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgShare.displayName = 'SvgShare'
export default SvgShare
