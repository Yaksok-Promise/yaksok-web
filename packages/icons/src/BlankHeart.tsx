import * as React from 'react'
import type { SVGProps } from 'react'

const SvgBlankHeart = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
    stroke?: string
    fill?: string
  }
>(({ size = 24, stroke = 'black', fill = 'none', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M9 5.77098C7.5 2.25015 2.25 2.62515 2.25 7.12518C2.25 11.6252 9 15.3753 9 15.3753C9 15.3753 15.75 11.6252 15.75 7.12518C15.75 2.62515 10.5 2.25015 9 5.77098Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill}
    />
  </svg>
))

SvgBlankHeart.displayName = 'SvgBlankHeart'
export default SvgBlankHeart
