import { useFormContext, UseFormReturn } from 'react-hook-form'
import { SignupRequest } from '@/validation/zod'

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
