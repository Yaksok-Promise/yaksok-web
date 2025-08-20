import { useDebounce } from '@/hooks/use-debounce'
import { useHttpMutation } from '@/hooks/use-http-mutation'

import {
  ChangeNicknameRequest,
  CheckNicknameRequest,
  CheckResultResponse,
} from '@yaksok/api/userType'
import { Button, TextField } from '@yaksok/ui'
import { LOCAL_STORAGE_KEY, getItem } from '@yaksok/utils'
import { useState } from 'react'

export type ChangeNicknameProps = {
  nickname: string
}

export default function ChangeNickname({ nickname }: ChangeNicknameProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [newNickname, setNewNickname] = useState('')

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
        // api/user/info 데이터 갱신 필요
      },
      onMutate: () => {
        setIsDisabled(true)
      },
      onError: error => {
        console.error(error)
        setIsDisabled(false)
      },
    }
  )

  const checkNicknameMutation = useHttpMutation<
    CheckNicknameRequest,
    CheckResultResponse
  >(
    '/api/user/check/nickname',
    'post',
    {
      headers: {
        Authorization: `Bearer ${getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
      },
    },
    {
      onSuccess: data => {
        if (data.result) {
          setIsSuccess(true)
        } else {
          setIsSuccess(false)
        }
      },
    }
  )

  const debounce = useDebounce()

  const debouncedVerify = debounce(async (nickname: string) => {
    const data = await checkNicknameMutation.mutateAsync({ nickname })
    if (data.result) {
      setNewNickname(nickname)
    }
  }, 1000)

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickNmae = e.target.value
    debouncedVerify(newNickNmae)
  }

  const changeNickname = async () => {
    await changeNicknameMutation.mutateAsync({ nickname: newNickname })
  }

  return (
    <div>
      <form>
        <TextField
          mode="box"
          label="닉네임"
          regex={/\*/}
          message={{
            regexError: '이미 사용중이에요',
          }}
          value={nickname}
          onCondition={() => {
            return isSuccess
          }}
          onChange={handleNicknameChange}
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
