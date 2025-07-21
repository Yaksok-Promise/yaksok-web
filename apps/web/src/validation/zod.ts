import { z } from 'zod'

// regex
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]|;:'",.<>?/\\`~])[A-Za-z\d!@#$%^&*()\-_=+{}\[\]|;:'",.<>?/\\`~]{10,}$/

export const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

export const nameRegex = /^(?:[가-힣]{2,})$/

export const smsCodeRegex = /^[0-9]{6}$/

// schema
const loginId = z.string().email('이메일 형식이 올바르지 않습니다.')
const password = z
  .string()
  .min(10, '비밀번호는 최소 10자 이상이어야 합니다.')
  .refine(value => /[a-zA-Z]/.test(value), {
    message: '영문자를 포함해야 합니다.',
  })
  .refine(value => /[0-9]/.test(value), {
    message: '숫자를 포함해야 합니다.',
  })
  .refine(value => /[^a-zA-Z0-9]/.test(value), {
    message: '특수문자를 포함해야 합니다.',
  })
const confirmPassword = z.string()
const phoneNumber = z
  .string()
  .regex(/^010-\d{4}-\d{4}$/, '휴대폰 번호 형식이 올바르지 않습니다.')
const gender = z.enum(['MALE', 'FEMALE'])
const birthDate = z.string()
const name = z.string().min(2, '이름은 필수입니다.')
const agreedMarketing = z.boolean()
const agreedAlarm = z.boolean()

export const SignupSchema = z
  .object({
    loginId,
    password,
    confirmPassword,
    phoneNumber,
    gender,
    birthDate,
    name,
    agreedMarketing,
    agreedAlarm,
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export type SignupRequest = z.infer<typeof SignupSchema>

export const SigninSchema = z.object({
  loginId,
  password,
})

export type SigninRequest = z.infer<typeof SigninSchema>

export const FindIdSchema = z.object({
  name,
  phoneNumber,
})

export type FindIdRequest = z.infer<typeof FindIdSchema>

export const FindPasswordSchema = z.object({
  loginId,
  name,
  phoneNumber,
})

export type FindPasswordRequest = z.infer<typeof FindPasswordSchema>

export const ChangePasswordSchema = z
  .object({
    password,
    confirmPassword: password,
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>
