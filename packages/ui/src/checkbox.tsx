import { Check } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

export type CheckboxProps = React.ComponentProps<'input'> &
  VariantProps<typeof checkboxVariants> & {
    checked?: boolean
    setChecked?: (value: boolean) => void
  }

const checkboxVariants = cva(
  'group clickable flex items-center justify-center',
  {
    variants: {
      size: {
        default: 'w-[24px] h-[24px]',
      },

      theme: {
        default: '',
        rounded: 'rounded-full bg-subGray01 has-checked:bg-black01',
        square: 'rounded-none bg-subGray01 has-checked:bg-black01',
      },
    },
    defaultVariants: {
      theme: 'default',
      size: 'default',
    },
  }
)

const checkVariants = cva('transition-all [&>path]:stroke-[2px]', {
  variants: {
    theme: {
      default:
        '[&>path]:stroke-subGray01 group-has-[:checked]:[&>path]:stroke-black w-[20px] h-[20px]',
      rounded: '[&>path]:stroke-white w-[16px] h-[20px]',
      square: '[&>path]:stroke-white w-[16px] h-[20px]',
    },
  },
  defaultVariants: {
    theme: 'default',
  },
})

function Checkbox({
  className,
  theme,
  checked,
  setChecked,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        checkboxVariants({ className, theme }),
        setChecked || 'pointer-events-none' // setChecked 없으면 부모 이벤트 위임
      )}
    >
      <Check className={checkVariants({ theme })} />
      <input
        type="checkbox"
        className="hidden"
        checked={checked ?? false}
        onChange={e => {
          if (setChecked) {
            setChecked?.(e.target.checked)
          } else {
            props.onChange?.(e)
          }
        }}
        {...props}
      />
    </label>
  )
}

export { Checkbox, checkboxVariants }
