import * as React from 'react'
import type { SVGProps } from 'react'

const SvgBookmark = React.forwardRef<
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
      d="M4.5 5.40015V12.514C4.5 13.5348 4.5 14.0451 4.65309 14.3575C4.93683 14.9364 5.55868 15.2691 6.19775 15.184C6.54255 15.1382 6.96723 14.8551 7.81657 14.2888L7.81861 14.2875C8.15526 14.063 8.32361 13.9508 8.49971 13.8885C8.82316 13.7742 9.17607 13.7742 9.49951 13.8885C9.67597 13.9509 9.84498 14.0636 10.183 14.2889C11.0323 14.8552 11.4575 15.1381 11.8023 15.1839C12.4414 15.269 13.0632 14.9364 13.3469 14.3575C13.5 14.0451 13.5 13.5346 13.5 12.514V5.39768C13.5 4.55925 13.5 4.1394 13.3367 3.81885C13.1929 3.5366 12.9628 3.3073 12.6805 3.16349C12.3597 3 11.9402 3 11.1001 3H6.90015C6.06007 3 5.63972 3 5.31885 3.16349C5.0366 3.3073 4.8073 3.5366 4.66349 3.81885C4.5 4.13972 4.5 4.56007 4.5 5.40015Z"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fill} // ⭐ fill prop 반영
    />
  </svg>
))

SvgBookmark.displayName = 'SvgBookmark'
export default SvgBookmark
