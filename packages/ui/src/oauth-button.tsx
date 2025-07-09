import { Apple, Google, Kakao, Naver, SvgComponent } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { ComponentPropsWithoutRef } from 'react'

export type Oauth = 'kakao' | 'naver' | 'apple' | 'google'

export type OauthButtonProps = ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    oauth: Oauth
  }

const buttonVariants = cva(
  'w-[46px] h-[46px] rounded-full flex items-center justify-center',
  {
    variants: {
      oauth: {
        kakao: 'bg-[#ffe400]',
        naver: 'bg-[#00C300]',
        apple: 'bg-black',
        google: 'bg-white',
      },
    },
  }
)

const oauthIconMap: Record<Oauth, React.FC<SvgComponent>> = {
  kakao: Kakao,
  naver: Naver,
  apple: Apple,
  google: Google,
}

export function OauthButton({
  oauth,
  onClick,
  className,
  ...props
}: OauthButtonProps) {
  const Icon = oauthIconMap[oauth]
  return (
    <button
      onClick={onClick}
      className={cn(buttonVariants({ oauth }), className)}
      {...props}
    >
      <Icon size={20} />
    </button>
  )
}
