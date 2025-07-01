import { SignupRequest } from '@/validation/zod'
import { UseFormReturn, useFormContext } from 'react-hook-form'

interface InjectedFormProps {
  methods: UseFormReturn<SignupRequest>
}

export function withFormContext<P extends InjectedFormProps>(
  Component: React.ComponentType<P>
) {
  return function WrappedComponent(props: Omit<P, keyof InjectedFormProps>) {
    const methods = useFormContext<SignupRequest>()

    return <Component {...(props as P)} methods={methods} />
  }
}
