import * as React from 'react'
import type { SVGProps } from 'react'
const SvgMagazineLogo = React.forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & {
    size?: number | string
  }
>(({ size = 24, ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 42 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_2532_19274)">
      <path
        d="M4.01923 13.1312H0.495682L3.53137 8.87827L0 0.869141H3.37298L5.53756 6.15446L9.54994 0.869141H13.1478L7.22112 8.60061L4.01923 13.1312Z"
        fill="white"
      />
      <path
        d="M13.3443 0.869141H16.554L15.8559 4.83753L21.6046 0.954198L25.6063 0.869141L20.3102 5.48475L23.9208 13.1312H19.1008L16.9001 7.95436L15.0728 9.24881L14.3914 13.1312H11.1816L13.3443 0.869141Z"
        fill="white"
      />
      <path
        d="M23.4922 13.1312L25.6548 0.869141H29.674L27.5114 13.1312H23.4922Z"
        fill="white"
      />
      <path
        d="M37.1305 7.56231L37.4707 4.76909L38.1522 0.869141H42.0013L39.8387 13.1312H36.0746L32.8727 6.45558L32.5325 9.24881L31.8511 13.1312H28.002L30.1646 0.869141H33.9286L37.1305 7.56231Z"
        fill="white"
      />
      <path d="M14.5684 7H5.13672V9.10591H14.5684V7Z" fill="white" />
    </g>
    <defs>
      <clipPath id="clip0_2532_19274">
        <rect
          width={42}
          height={12.262}
          fill="white"
          transform="translate(0 0.869141)"
        />
      </clipPath>
    </defs>
  </svg>
))
SvgMagazineLogo.displayName = 'SvgMagazineLogo'
export default SvgMagazineLogo
