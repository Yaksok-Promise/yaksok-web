import { useHttpMutation } from '@/hooks/tanstak/use-http-mutation'
import { useFlow } from '@/utils/stackflow'
import {
  SigninRequest,
  SigninSchema,
  emailRegex,
  passwordRegex,
} from '@/validation/zod'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { LoginRequest, LoginResponse } from '@yaksok/api/userType'
import { useLoginStore } from '@yaksok/store'
import { Button, OauthButton, TextField } from '@yaksok/ui'
import { LOCAL_STORAGE_KEY, setItem } from '@yaksok/utils'
import { useForm } from 'react-hook-form'

export default function Signin() {
  const { push, replace } = useFlow()
  const { saveAccessToken, saveRefreshToken } = useLoginStore()
  const goSignup = () => {
    push('SignupPage', {
      title: '회원가입',
    })
  }

  const goFindId = () => {
    push('FindIdPassword', {
      mode: 'id',
    })
  }
  const goFindPassword = () => {
    push('FindIdPassword', {
      mode: 'password',
    })
  }

  const goHome = () => {
    replace('MainPage', {})
  }

  const { handleSubmit, register, control } = useForm<SigninRequest>({
    resolver: zodResolver(SigninSchema),
    mode: 'onChange',
  })

  const mutation = useHttpMutation<LoginRequest, LoginResponse>(
    '/api/user/login',
    'post',
    undefined,
    {
      onSuccess: async data => {
        setItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN, data.accessToken)
        setItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN, data.refreshToken)
        saveAccessToken(data.accessToken)
        saveRefreshToken(data.refreshToken)

        if (typeof window !== 'undefined' && window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({
              type: 'LOGIN',
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          )
        }

        if (!window.ReactNativeWebView) {
          goHome()
        }
      },
      onError: error => {
        console.log('로그인 실패', error)
      },
    }
  )
  const onSubmit = async (data: SigninRequest) => {
    await mutation.mutateAsync(data)
  }

  return (
    <AppScreen>
      <div className="px-4">
        <header className="mt-20 mb-10">
          <h5 className="text-head5">환영합니다 {':)'}</h5>
          <h5 className="text-head5">건강한 하루, 약속과 함께해요</h5>
        </header>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label=""
            mode="box"
            placeholder="아이디"
            type="text"
            message={{
              regexError: '이메일 형식이 올바르지 않습니다.',
            }}
            regex={emailRegex}
            {...register('loginId')}
          />
          <TextField
            mode="box"
            label=""
            placeholder="비밀번호"
            type="password"
            message={{
              regexError: '',
            }}
            regex={passwordRegex}
            {...register('password')}
          />
          <Button className="mt-2 mb-4" onClick={handleSubmit(onSubmit)}>
            로그인
          </Button>
        </form>
        {/* biome-ignore lint/nursery/useSortedClasses: <explanation> */}
        <div className="mb-6 flex w-full items-center justify-end divide-x-1 divide-[rgb(99, 99, 102)]">
          <button className="px-2 text-gray03 text-subhead3" onClick={goFindId}>
            아이디 찾기
          </button>
          <button
            className="px-2 text-gray03 text-subhead3"
            onClick={goFindPassword}
          >
            비밀번호 찾기
          </button>
        </div>
        <button
          onClick={goSignup}
          className="w-full text-center text-black01 text-body2 underline underline-offset-1"
        >
          이메일 회원가입
        </button>

        <footer className="mt-20">
          <div className="flex w-full items-center">
            <div className="flex-grow border-subGray01 border-t" />
            <span className="mx-4 text-caption1 text-gray04">간편 로그인</span>
            <div className="flex-grow border-subGray01 border-t" />
          </div>
          <div className="mt-7 flex items-center justify-center gap-6">
            <OauthButton oauth="kakao" />
            <OauthButton oauth="naver" />
            <OauthButton oauth="apple" />
            <OauthButton oauth="google" />
          </div>
        </footer>
      </div>
      <DevTool control={control} />
    </AppScreen>
  )
}
