import * as React from 'react'
import type { SVGProps } from 'react'
const SvgReplyArrow = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, fill = 'black', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 10 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M9.35355 9.68656C9.54882 9.4913 9.54882 9.17472 9.35355 8.97945L6.17157 5.79747C5.97631 5.60221 5.65973 5.60221 5.46447 5.79747C5.2692 5.99274 5.2692 6.30932 5.46447 6.50458L8.29289 9.33301L5.46447 12.1614C5.2692 12.3567 5.2692 12.6733 5.46447 12.8685C5.65973 13.0638 5.97631 13.0638 6.17157 12.8685L9.35355 9.68656ZM1.5 1.33301C1.5 1.05687 1.27614 0.833008 1 0.833008C0.723858 0.833008 0.5 1.05687 0.5 1.33301H1.5ZM9 8.83301H6V9.83301H9V8.83301ZM1.5 4.33301V1.33301H0.5V4.33301H1.5ZM6 8.83301C3.51472 8.83301 1.5 6.81829 1.5 4.33301H0.5C0.5 7.37057 2.96243 9.83301 6 9.83301V8.83301Z"
      fill={fill}
    />
  </svg>
))
SvgReplyArrow.displayName = 'SvgReplyArrow'
export default SvgReplyArrow
