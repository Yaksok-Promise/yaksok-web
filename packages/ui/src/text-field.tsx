import * as React from 'react'

import { Check } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { VariantProps, cva } from 'class-variance-authority'
import { useState } from 'react'

export const textFieldVariants = cva(
  cn(
    'w-full py-[14px] text-body2',
    'bg-gray10 placeholder:text-gray05 focus:outline-none focus:ring-0'
  )
)

type ErrorStatus = 'regexError' | 'verificationError'
type SuccessStatus = 'regexSuccess' | 'success'
type Status = undefined | ErrorStatus | SuccessStatus

type Message = Partial<Record<ErrorStatus, string>> // 에러에 관한 메세지

export interface TextFieldProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof textFieldVariants> {
  label: string
  message: Message
  regex: RegExp
  onVerify?: (value: string) => boolean
  onFormat?: (value: string) => string
  onCondition?: (value: string) => boolean
}

export const TextField = React.forwardRef(function TextField(
  {
    type = 'text',
    className,
    value,
    onChange,
    onBlur,
    regex,
    onVerify,
    onFormat,
    label,
    message,
    onCondition,
    ...rest
  }: TextFieldProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [status, setStatus] = useState<Status>(undefined)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    // 포맷 함수 적용
    if (onFormat) {
      newValue = onFormat(newValue)
    }

    // 외부 onChange 전달
    onChange?.(e)

    if (newValue.length === 0) {
      setStatus(undefined)
      return
    }

    if (status === 'success') {
      setStatus(undefined)
    }

    if (onCondition) {
      const isTrue = onCondition(e.target.value as string)
      setStatus(isTrue ? 'success' : 'regexError')
      return
    }

    if (!onVerify) {
      setStatus(regex.test(newValue) ? 'success' : 'regexError')
      return
    }

    setStatus(regex.test(newValue) ? 'regexSuccess' : 'regexError')
  }

  const handleVerify = () => {
    const isVerified = onVerify?.(value as string)
    setStatus(isVerified ? 'success' : 'verificationError')
  }

  return (
    <div className="flex w-full flex-col">
      <label className="text-caption1">
        {status?.includes('Error') ? (
          <span className="text-red01">{message[status as ErrorStatus]}</span>
        ) : (
          label
        )}
      </label>
      <div className="flex items-center gap-[16px]">
        <div className="flex w-full flex-1 items-center justify-between border-black01 border-b-[2px]">
          <input
            ref={ref}
            type={type}
            data-slot="input"
            value={value}
            onChange={handleInputChange}
            onBlur={onBlur}
            className={cn(
              textFieldVariants({
                className,
              })
            )}
            {...rest}
          />
          {status === 'success' && <Check />}
        </div>
        {onVerify && (
          <button
            className="h-[25px] w-[66px] rounded-full bg-black01 text-caption1 text-white01 disabled:bg-gray06 disabled:text-gray05"
            disabled={status === 'regexError' || status === undefined}
            onClick={handleVerify}
          >
            인증하기
          </button>
        )}
      </div>
    </div>
  )
})

export default TextField
