import { slicePhoneNumber } from '@/utils/slice-phone-number'
import { Button } from '@yaksok/ui/button'
import TextField from '@yaksok/ui/text-field'
import { useState } from 'react'
import SignupTitle from './signup-title'
import { WithFormContext } from './type'
import { withFormContext } from './with-form-context'

function PhoneNumber({ onNext, methods, title }: WithFormContext) {
  const { register } = methods
  const [signNumber, setSignNumber] = useState<null | string>(null)
  const [isShow, setIsShow] = useState(false)
  const [confirm, setConfirm] = useState(false)

  return (
    <div>
      <SignupTitle>{title}</SignupTitle>
      <div className="flex flex-col gap-4">
        <TextField
          label="휴대폰번호"
          placeholder="- 없이 숫자만 입력"
          type="tel"
          message={{
            regexError: '유효한 휴대폰 번호가 아닙니다.',
            verificationError: '인증번호가 일치하지 않습니다.',
          }}
          regex={/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/}
          onFormat={slicePhoneNumber}
          onVerify={() => {
            // 인증하기 api 요청 기능 추가
            setSignNumber('123456')
            setIsShow(true)
            return true
          }}
          {...register('phoneNumber')}
          inputMode="numeric"
        />
        {isShow && (
          <TextField
            label="인증번호"
            placeholder="인증번호 6자리를 입력해 주세요."
            type="tel"
            message={{
              regexError: '인증번호 6자리를 입력해 주세요.',
            }}
            regex={/^[0-9]{6}$/}
            onCondition={value => {
              if (value === signNumber) {
                setConfirm(true)
              } else {
                setConfirm(false)
              }
              return value === signNumber
            }}
            inputMode="numeric"
          />
        )}
      </div>

      <div className="mt-25">
        <Button disabled={!confirm} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(PhoneNumber)
