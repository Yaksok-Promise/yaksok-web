import * as React from 'react'
import type { SVGProps } from 'react'
const SvgBlankHeart = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M9 5.77098C7.5 2.25015 2.25 2.62515 2.25 7.12518C2.25 11.6252 9 15.3753 9 15.3753C9 15.3753 15.75 11.6252 15.75 7.12518C15.75 2.62515 10.5 2.25015 9 5.77098Z"
      stroke="#48484A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 5.77098C7.5 2.25015 2.25 2.62515 2.25 7.12518C2.25 11.6252 9 15.3753 9 15.3753C9 15.3753 15.75 11.6252 15.75 7.12518C15.75 2.62515 10.5 2.25015 9 5.77098Z"
      stroke="black"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 5.77098C7.5 2.25015 2.25 2.62515 2.25 7.12518C2.25 11.6252 9 15.3753 9 15.3753C9 15.3753 15.75 11.6252 15.75 7.12518C15.75 2.62515 10.5 2.25015 9 5.77098Z"
      stroke="black"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 5.77098C7.5 2.25015 2.25 2.62515 2.25 7.12518C2.25 11.6252 9 15.3753 9 15.3753C9 15.3753 15.75 11.6252 15.75 7.12518C15.75 2.62515 10.5 2.25015 9 5.77098Z"
      stroke="black"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 5.77098C7.5 2.25015 2.25 2.62515 2.25 7.12518C2.25 11.6252 9 15.3753 9 15.3753C9 15.3753 15.75 11.6252 15.75 7.12518C15.75 2.62515 10.5 2.25015 9 5.77098Z"
      stroke="black"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 5.77098C7.5 2.25015 2.25 2.62515 2.25 7.12518C2.25 11.6252 9 15.3753 9 15.3753C9 15.3753 15.75 11.6252 15.75 7.12518C15.75 2.62515 10.5 2.25015 9 5.77098Z"
      stroke="black"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgBlankHeart.displayName = 'SvgBlankHeart'
export default SvgBlankHeart
