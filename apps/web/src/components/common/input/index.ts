import { UseFormReturn } from 'react-hook-form'

export * from './birthdate'
export * from './id'
export * from './name'
export * from './phonenumber'
export * from './password'
export * from './confirm-password'

export type InputProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  methods: UseFormReturn<any>
}
