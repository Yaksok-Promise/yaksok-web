import AppLayout from '@/components/common/app-layout'
import { BottomsheetLikeBackground } from '@/components/common/bottomsheet-like-background'
import { MagazineOrGeneralForum } from '@/const/magazine-and-lounge'
import { FeedbackFormValues, FeedbackSchema } from '@/validation/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AppScreen } from '@stackflow/plugin-basic-ui'
import { useStack } from '@stackflow/react'
import { Button } from '@yaksok/ui'

import { cn } from '@yaksok/utils'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export type FeedbackPageProps = {
  params: { previousPage: MagazineOrGeneralForum }
}
export default function FeedbackPage({
  params: { previousPage },
}: FeedbackPageProps) {
  const stack = useStack()
  console.log(stack)

  const [isOpen, setIsOpen] = useState(false)
  return (
    <AppLayout>
      <AppScreen
        appBar={{
          title: '',
          textColor: '#ffffff',
          iconColor: '#ffffff',
          backgroundColor: '#000000',
          border: false,
        }}
      >
        <BottomsheetLikeBackground>
          <div className="flex h-full min-h-0 flex-1 flex-col gap-5 rounded-t-[20px] bg-white px-4 pt-11 pb-10">
            <h1 className="text-gray01 text-head6">피드백・문의</h1>
            <p className="whitespace-pre-wrap text-black01 text-body2">{`불편한 점이나 궁금한 점이 있으신가요?\n여러분의 의견을 들려주세요.\n더 나은 서비스로 보답하겠습니다.`}</p>
            <div className="flex">
              <span className="text-black01 text-subhead2">이메일 | </span>
              <span className="text-black01 text-body2">
                yaaksokkr@gmail.com
              </span>
            </div>
            <Button>카카오톡 문의하기</Button>
            <div className="w-full border-1 border-[#63636633]/20" />
            {!isOpen && (
              <Button mode="line" onClick={() => setIsOpen(true)}>
                서비스 이용 만족도 조사
              </Button>
            )}
            {isOpen && <FeedBackForm />}
          </div>
        </BottomsheetLikeBackground>
      </AppScreen>
    </AppLayout>
  )
}

const RATING = [
  { value: '1', label: 'Very bad', emoji: '😠' },
  { value: '2', label: 'Bad', emoji: '😕' },
  { value: '3', label: 'Okay', emoji: '🙂' },
  { value: '4', label: 'Good', emoji: '😊' },
  { value: '5', label: 'Great', emoji: '😁' },
] as const

export const FeedBackForm = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: { rating: '5', comment: '' },
  })

  const _rating = watch('rating')

  const onSubmit = async (data: FeedbackFormValues) => {
    // TODO: replace with your API call
    console.log('submit:', data)
    alert(`Thanks! rating=${data.rating}, comment=${data.comment ?? ''}`)
  }

  return (
    <div className="flex flex-col gap-8 rounded-[12px] px-4 py-8 shadow-box">
      <div className="flex flex-col items-center justify-center gap-4">
        <label className="text-black01 text-head6">
          서비스 이용 만족도 조사
        </label>
        <span className="text-body1 text-gray03">
          서비스 이용에 대한 만족도를 알려주세요
        </span>
      </div>

      <form
        id="feedback-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-3">
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <>
                <div className="flex items-center justify-center gap-2">
                  {RATING.map(opt => {
                    const selected = field.value === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        aria-label={opt.label}
                        onClick={() => field.onChange(opt.value)}
                        className={cn(
                          'rounded-[8px] px-3 py-2 transition-colors',
                          'flex items-center justify-center shadow-inner',
                          selected
                            ? 'bg-[linear-gradient(160deg,#959598_-5.15%,#121212_87.35%)] shadow-box'
                            : 'bg-gray07'
                        )}
                      >
                        <span aria-hidden className="text-head5">
                          {opt.emoji}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          />
          {errors.rating && (
            <p className="text-center text-red-500 text-sm">
              {errors.rating.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-center text-body1 text-gray02">
            불편한 점이나 궁금한 점을 남겨주세요
          </label>
          <textarea
            placeholder="여기에 의견을 작성해 주세요"
            className={cn(
              'h-[120px] w-full resize-none rounded-[8px] border-1 border-subGray01 p-6 text-black text-body2',
              'placeholder:text-subGray01 focus:outline-none'
            )}
            {...register('comment')}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment.message}</p>
          )}
        </div>
      </form>
      <Button
        type="submit"
        form="feedback-form"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-black py-5 font-bold text-[18px] text-white disabled:opacity-60"
      >
        의견 남기기
      </Button>
    </div>
  )
}
