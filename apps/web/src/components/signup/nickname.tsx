import { TextField } from '@yaksok/ui/text-field'
import { WithFormContext } from './type'
import { useWatch } from 'react-hook-form'
import { Button } from '@yaksok/ui/button'
import { withFormContext } from './with-form-context'
import { nicknameRegex } from '@/validation/zod'

function NickName({ methods, title, onNext }: WithFormContext) {
  // 욕설 비하 등 부적절한 단어 필터링 기능이 없음
  const nicknameValue = useWatch({
    control: methods.control,
    name: 'nickname',
    defaultValue: '',
  })

  const isDisabled = nicknameRegex.test(nicknameValue)

  return (
    <div>
      <h1 className="mb-10 text-head5">{title}</h1>
      <TextField
        label="닉네임"
        placeholder="2자 이상 6자 이하 입력해 주세요"
        type="text"
        message={{
          regexError: '2자 이상 6자 이하로 입력해 주세요',
        }}
        regex={nicknameRegex}
        {...methods.register('nickname')}
      />
      <div className="mt-25">
        <Button disabled={!isDisabled} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default withFormContext(NickName)
