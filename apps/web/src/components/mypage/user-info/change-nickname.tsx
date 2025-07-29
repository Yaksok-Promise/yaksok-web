import { useDebounce } from '@/hooks/use-debounce'
import { useHttpMutation } from '@/hooks/use-http-mutation'
import {
  ChangeNicknameSchema,
  ChangeNicknameSchemaRequest,
} from '@/validation/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeNicknameRequest } from '@yaksok/api/userType'
import { Button, TextField } from '@yaksok/ui'
import { LOCAL_STORAGE_KEY, getItem } from '@yaksok/utils'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export type ChangeNicknameProps = {
  nickname: string
}

export default function ChangeNickname({ nickname }: ChangeNicknameProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const { register, handleSubmit, getValues } =
    useForm<ChangeNicknameSchemaRequest>({
      resolver: zodResolver(ChangeNicknameSchema),
    })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  const changeNicknameMutation = useHttpMutation<ChangeNicknameRequest, void>(
    '/api/user/change/nickname',
    'patch',
    {
      headers: {
        Authorization: `Bearer ${getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
      },
    },
    {
      onSuccess: () => {
        setIsSuccess(false)
      },
      onMutate: () => {
        setIsDisabled(true)
      },
    }
  )
  const _debounce = useDebounce()

  const _onVerify = () => {
    const _nickname = getValues('nickname')
  }

  const changeNickname = async () => {
    const nickname = getValues('nickname')
    await changeNicknameMutation.mutateAsync({ nickname })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          mode="box"
          label="닉네임"
          regex={/\*/}
          message={{
            verificationError: '이미 사용중이에요',
          }}
          value={nickname}
          {...register('nickname')}
        />
        {isSuccess && (
          <Button onClick={changeNickname} disabled={isDisabled}>
            변경하기
          </Button>
        )}
      </form>
    </div>
  )
}
