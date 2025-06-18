import * as React from "react";
import type { SVGProps } from "react";
const SvgLogoWithIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 24"
    {...props}
  >
    <g fill="#018381" clipPath="url(#logo-with-icon_svg__a)">
      <path d="M2.01 20.363c.006-2.082 1.562-3.641 3.623-3.63 2.002.012 3.53 1.588 3.531 3.643.001 2.036-1.56 3.632-3.543 3.624-2.074-.008-3.617-1.562-3.611-3.637M20.66 7.13C20.4 3.356 17.812.595 14.048.2 10.96-.123 7.857.025 4.767.096 4.008.113 3.273.41 2.75.966a2.8 2.8 0 0 0-.639 1.12c-.152.513-.104 1.035-.104 1.565v9.196h.005c.027 1.655 1.212 2.786 2.975 2.805 1.313.014 2.625.002 3.937.002v-.026c1.39 0 2.786.067 4.172-.016 1.926-.117 3.725-.704 5.181-2.021 1.906-1.724 2.558-3.93 2.383-6.46m-5.193.841a3.03 3.03 0 0 1-3.03 3.03H7.959a.5.5 0 0 1-.502-.502V5.444c0-.278.225-.503.502-.503h4.478a3.03 3.03 0 0 1 3.03 3.03" />
    </g>
    <defs>
      <clipPath id="logo-with-icon_svg__a">
        <path fill="#fff" d="M2 0h18.688v24H2z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgLogoWithIcon;
