import { useFunnel } from '@/hooks/use-funnel'
import { FindIdRequest, FindIdSchema } from '@/validation/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

const IdSteps = ['id', 'done']

export type IdStepsType = (typeof IdSteps)[number]

export default function FindId() {
  const { Funnel, Step, setStep, currentStep } = useFunnel<IdStepsType>('id')
  const methods = useForm<FindIdRequest>({
    resolver: zodResolver(FindIdSchema),
    mode: 'onChange',
  })
  const onSubmit = (data: FindIdRequest) => console.log(data)
  return (
    <main>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Funnel>
            <Step name="id"></Step>
            <Step name="done"></Step>
          </Funnel>
        </form>
      </FormProvider>
    </main>
  )
}

const IdStep = () => {
  return <div>IdStep</div>
}
