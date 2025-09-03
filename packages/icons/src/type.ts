import type { ReactElement, SVGProps } from 'react'
export type SvgComponent = SVGProps<SVGSVGElement> & {
  size?: number | string
}
export type SvgIconElement = ReactElement<SVGProps<SvgComponent>>
