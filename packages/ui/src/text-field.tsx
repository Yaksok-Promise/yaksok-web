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
}

export default function TextField({
  type = 'text',
  className,
  ...props
}: TextFieldProps) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<Status>(undefined)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    // input value 값 업데이트
    if (props.onFormat) {
      setValue(props.onFormat(value))
    } else {
      setValue(value)
    }

    if (value.length === 0) {
      setStatus(undefined)
      return
    }

    // 인증 완료 후 입력 시 상태 초기화
    if (status === 'success') {
      setStatus(undefined)
    }

    // 정규식 검사만 필요한 경우
    if (!props.onVerify) {
      setStatus(props.regex.test(value) ? 'success' : 'regexError')
      return
    }

    //정규식 + 인증 검사 필요한 경우
    setStatus(props.regex.test(value) ? 'regexSuccess' : 'regexError')
  }

  const handleVerify = () => {
    const isVerified = props.onVerify!(props.value as string)
    setStatus(isVerified ? 'success' : 'verificationError')
  }

  return (
    <div className="flex w-full flex-col">
      <label className="text-caption1">
        {status?.includes('Error') ? (
          <span className="text-red01">
            {props.message[status as ErrorStatus]}
          </span>
        ) : (
          props.label
        )}
      </label>
      <div className="flex items-center gap-[16px]">
        <div className="flex w-full flex-1 items-center justify-between border-black01 border-b-[2px]">
          <input
            type={type}
            data-slot="input"
            value={value}
            className={cn(
              textFieldVariants({
                className,
              })
            )}
            onChange={handleInputChange}
            {...props}
          />
          {status === 'success' && <Check />}
        </div>
        {props.onVerify && (
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
}
