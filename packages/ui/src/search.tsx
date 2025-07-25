import { MagnifyingGlass } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import * as React from 'react'
import { useState } from 'react'

export interface SearchProps extends React.ComponentProps<'input'> {
  wrapperClassName?: string
  containerClassName?: string
}

export const Search = React.forwardRef(function Search(
  {
    type = 'text',
    className,
    value,
    onChange,
    wrapperClassName,
    containerClassName,
    placeholder = '내 주변 약국 찾기',
    ...rest
  }: SearchProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value

    // 외부 onChange 전달
    onChange?.(e)
    setInputValue(newValue)
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const child = e.currentTarget.children[0] as HTMLInputElement
    child.focus()
  }

  return (
    <div className={cn(containerClassName)}>
      <div
        onClick={onClick}
        className={cn(
          'relative min-h-[48px] w-full rounded-2xl bg-white01 px-15 py-3 shadow-basic2',
          wrapperClassName
        )}
      >
        <input
          ref={ref}
          type={type}
          data-slot="input"
          value={inputValue}
          onChange={handleInputChange}
          className={cn('text-body2 focus:outline-none', className)}
          placeholder={placeholder}
          {...rest}
        />
        <MagnifyingGlass className="-translate-y-1/2 absolute top-1/2 left-5" />
      </div>
    </div>
  )
})
