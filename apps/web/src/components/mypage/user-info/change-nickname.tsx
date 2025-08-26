import { useDebounce } from '@/hooks/use-debounce'
import { useHttpMutation } from '@/hooks/use-http-mutation'

import { QUERY_KEY } from '@/utils/query-key'
import { useQueryClient } from '@tanstack/react-query'
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
  const [isDirty, setIsDirty] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [newNickname, setNewNickname] = useState('')
  const queryClient = useQueryClient()

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
        setIsDirty(false)
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.MY_INFO],
        })
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
        if (data.result === false) {
          console.log('data', data)
          setIsSuccess(true)
        } else {
          setIsSuccess(false)
        }
      },
      onError: error => {
        console.error(error)
        setIsSuccess(false)
      },
      onSettled: () => {
        setIsDirty(true)
      },
    }
  )

  const debounce = useDebounce()

  const debouncedVerify = debounce(async (nickname: string) => {
    const data = await checkNicknameMutation.mutateAsync({ nickname })

    if (data.result === false) {
      setNewNickname(nickname)
    }
  }, 400)

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
        <div className="mb-2 flex flex-col gap-1">
          <TextField
            mode="box"
            label="닉네임"
            regex={/\*/}
            message={{}}
            value={nickname}
            onChange={handleNicknameChange}
          />
          {!isSuccess && isDirty && (
            <span className="text-caption1 text-red01">이미 사용중이에요</span>
          )}
        </div>

        {isSuccess && (
          <Button
            onClick={changeNickname}
            disabled={isDisabled}
            className="mt-3"
          >
            변경하기
          </Button>
        )}
      </form>
    </div>
  )
}
