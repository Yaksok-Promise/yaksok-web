import { ConfirmPassword, Password } from '@/components/common'
import { useHttpMutation } from '@/hooks/tanstak/use-http-mutation'
import { useGetToken } from '@/hooks/use-get-token'
import {
  ChangePasswordSchema,
  ChangePasswordSchemaRequest,
} from '@/validation/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangePasswordRequest } from '@yaksok/api/userType'
import { Button } from '@yaksok/ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ChangePassword() {
  const [isChange, setIsChange] = useState(false)
  const token = useGetToken()
  const methods = useForm<ChangePasswordSchemaRequest>({
    resolver: zodResolver(ChangePasswordSchema),
  })
  const onSubmit = methods.handleSubmit(data => {
    console.log(data)
  })

  const changePasswordMutation = useHttpMutation<ChangePasswordRequest, void>(
    '/api/user/change/password',
    'post',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      onSuccess: () => {
        setIsChange(false)
      },
    }
  )

  const changePassword = async () => {
    const oldPassword = methods.getValues('oldPassword')
    const newPassword = methods.getValues('newPassword')
    await changePasswordMutation.mutateAsync({ oldPassword, newPassword })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className=" flex gap-2">
        <div className="flex-1">
          <Password
            methods={methods}
            type="oldPassword"
            mode="box"
            placeholder="현재 비밀번호를 입력하세요"
            isShownIcon
            label="비밀번호"
          />
        </div>

        <Button
          className=" my-6.5 h-12 w-20 p-3 text-subhead2"
          onClick={() => {
            methods.resetField('oldPassword')
            methods.resetField('newPassword')
            methods.resetField('confirmPassword')
            setIsChange(prev => !prev)
          }}
        >
          {isChange ? '변경취소' : '변경하기'}
        </Button>
      </div>
      {isChange && (
        <div className="flex flex-col gap-2">
          <Password
            methods={methods}
            type="newPassword"
            mode="box"
            isShownIcon
            label=""
            placeholder="새 비밀번호를 입력하세요"
          />
          <ConfirmPassword
            confirmName="newPassword"
            methods={methods}
            mode="box"
            isShownIcon
            placeholder="새 비밀번호를 한 번 더 입력해 주세요"
            label=""
            bottomLabel="영문, 숫자, 특수문자 조합 10글자 이상"
          />
          <Button onClick={changePassword}>변경완료</Button>
        </div>
      )}
    </form>
  )
}
