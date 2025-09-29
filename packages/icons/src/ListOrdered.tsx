import * as React from 'react'
import type { SVGProps } from 'react'
const SvgListOrdered = React.forwardRef<
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
      d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10"
      stroke="#48484A"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10"
      stroke="black"
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17H20M4 15.6853V15.5C4 14.6716 4.67157 14 5.5 14H5.54054C6.34658 14 7.00021 14.6534 7.00021 15.4595C7.00021 15.8103 6.8862 16.1519 6.67568 16.4326L4 20.0002L7 20M10 12H20M10 7H20M4 5L6 4V10"
      stroke={stroke}
      strokeOpacity={0.2}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))
SvgListOrdered.displayName = 'SvgListOrdered'
export default SvgListOrdered
