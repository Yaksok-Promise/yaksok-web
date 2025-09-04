import * as React from 'react'
import type { SVGProps } from 'react'
const SvgTriangleWarning = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, stroke = 'black', ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g opacity={0.5}>
      <path
        d="M8 5.99988V8.66654M2.91927 10.1331C2.31298 11.1832 2.00992 11.7085 2.05521 12.1393C2.09471 12.5151 2.29195 12.8565 2.59766 13.0787C2.94802 13.3332 3.55394 13.3332 4.76569 13.3332H11.2343C12.4461 13.3332 13.0519 13.3332 13.4023 13.0787C13.708 12.8565 13.9053 12.5151 13.9448 12.1393C13.9901 11.7085 13.6871 11.1832 13.0808 10.1331L9.84766 4.53308C9.24137 3.48296 8.93809 2.95799 8.54232 2.78178C8.19711 2.62808 7.80267 2.62808 7.45746 2.78178C7.06185 2.95791 6.75876 3.48289 6.15298 4.53214L2.91927 10.1331ZM8.03385 10.6665V10.7332L7.9668 10.7333V10.6665H8.03385Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
))
SvgTriangleWarning.displayName = 'SvgTriangleWarning'
export default SvgTriangleWarning
