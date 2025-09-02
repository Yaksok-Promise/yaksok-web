import * as React from 'react'
import type { SVGProps } from 'react'
const SvgPencil = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, stroke = 'white', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M3.33325 16.6666H16.6666M3.33325 16.6666V13.3333L9.99992 6.6666M3.33325 16.6666L6.66659 16.6666L13.3332 9.99992M9.99992 6.6666L12.3904 4.27606L12.3919 4.27464C12.7209 3.94557 12.8858 3.78074 13.0758 3.71901C13.2431 3.66463 13.4235 3.66463 13.5908 3.71901C13.7807 3.7807 13.9453 3.94534 14.2739 4.27394L15.7238 5.72377C16.0538 6.05378 16.2189 6.21887 16.2807 6.40914C16.3351 6.57651 16.335 6.7568 16.2807 6.92417C16.2189 7.11431 16.054 7.27914 15.7245 7.60868L15.7238 7.60939L13.3332 9.99992M9.99992 6.6666L13.3332 9.99992"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgPencil.displayName = 'SvgPencil'
export default SvgPencil
