import { Check, Show } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
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
type TextMode = 'line' | 'box'

export interface TextFieldProps
  extends React.ComponentProps<'input'>,
    VariantProps<typeof textFieldVariants> {
  label?: string
  message: Message
  regex: RegExp
  isShownIcon?: boolean
  mode?: TextMode
  onVerify?: (value: string) => boolean | void | Promise<boolean>
  onFormat?: (value: string) => string
  onCondition?: (value: string) => boolean
  bottomLabel?: string
  verifyButtonText?: string
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
    mode = 'line',
    isShownIcon = false,
    bottomLabel,
    verifyButtonText = '인증하기',
    ...rest
  }: TextFieldProps,
  ref: React.Ref<HTMLInputElement>
) {
  const [status, setStatus] = useState<Status>(undefined)
  const [inputValue, setInputValue] = useState(value)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    // 포맷 함수 적용
    if (onFormat) {
      newValue = onFormat(newValue)
    }

    // 외부 onChange 전달
    onChange?.(e)
    setInputValue(newValue)

    if (newValue.length === 0) {
      setStatus(undefined)
      return
    }

    if (status === 'success') {
      setStatus(undefined)
    }

    if (onCondition) {
      const isTrue = onCondition(e.target.value as string)
      console.log('isTrue', isTrue)
      console.log(e.target.value)
      setStatus(isTrue ? 'success' : 'regexError')
      return
    }

    if (!onVerify) {
      setStatus(regex.test(newValue) ? 'success' : 'regexError')
      return
    }

    setStatus(regex.test(newValue) ? 'regexSuccess' : 'regexError')
  }

  const handleVerify = async () => {
    const isVerified = await onVerify?.(value as string)
    setStatus(isVerified ? 'success' : 'verificationError')
    console.log('Verification', isVerified)
  }

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  if (mode === 'line') {
    return (
      <div className="flex w-full flex-col">
        {label && status?.includes('Error') && (
          <label className="text-caption1">
            {status?.includes('Error') ? (
              <span className="text-red01">
                {message[status as ErrorStatus]}
              </span>
            ) : (
              label && (
                <label className="text-black01 text-caption1">{label}</label>
              )
            )}
          </label>
        )}
        <div className="flex items-center gap-[16px]">
          <div className="flex w-full flex-1 items-center justify-between border-black01 border-b-[2px]">
            <input
              ref={ref}
              type={showPassword ? 'text' : type}
              data-slot="input"
              value={inputValue}
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
              {verifyButtonText}
            </button>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-2">
        {label && <label className="text-black01 text-caption1">{label}</label>}
        <div className="relative flex flex-1 items-center justify-between">
          <input
            ref={ref}
            type={showPassword ? 'text' : type}
            data-slot="input"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={onBlur}
            className={cn(
              'min-h-[48px] w-full rounded-[8px] border-[1px] border-gray06 bg-white01 px-4 text-black01 text-body2 caret-blue01 focus:border-blue01 focus:outline-none disabled:bg-gray07',
              className
            )}
            {...rest}
          />
          {isShownIcon && (
            <HideAndShowPassword
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
            />
          )}
        </div>
      </div>

      {/* This won't be affected by gap */}
      <div className="text-caption1">
        {status?.includes('Error') ? (
          <span className="text-red01">{message[status as ErrorStatus]}</span>
        ) : (
          <span className="text-caption1 text-gray03">{bottomLabel}</span>
        )}
      </div>
    </div>
  )
})

type HideAndShowPasswordProps = {
  showPassword: boolean
  handleShowPassword: () => void
}
const HideAndShowPassword = ({
  showPassword,
  handleShowPassword,
}: HideAndShowPasswordProps) => {
  return (
    <button onClick={handleShowPassword} className="absolute top-3 right-4">
      <Show size={24} />
    </button>
  )
}
