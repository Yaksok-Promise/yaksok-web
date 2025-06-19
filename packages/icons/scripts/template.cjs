const template = (variables, { tpl }) => {
  return tpl`
    import * as React from 'react'
    import type { SVGProps } from 'react'

    const ${variables.componentName} = React.forwardRef<SVGSVGElement, SVGProps<SVGSVGElement> & { size?: number | string }>(
      ({ size = 24, ...props }, ref) => (
        ${variables.jsx}
      )
    );

    ${variables.componentName}.displayName = '${variables.componentName}';
    export default ${variables.componentName};
  `
}

module.exports = template
