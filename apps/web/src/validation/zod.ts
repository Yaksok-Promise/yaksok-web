import { z } from 'zod'

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}\[\]|;:'",.<>?/\\`~])[A-Za-z\d!@#$%^&*()\-_=+{}\[\]|;:'",.<>?/\\`~]{10,}$/

export const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

export const nameRegex = /^(?:[가-힣]{2,})$/

export const nicknameRegex = /^[A-Za-z0-9가-힣]{2,6}$/

export const SignupSchema = z
  .object({
    loginId: z.string().email('이메일 형식이 올바르지 않습니다.'),
    password: z
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
      }),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .regex(/^010-\d{4}-\d{4}$/, '휴대폰 번호 형식이 올바르지 않습니다.'),
    gender: z.enum(['MALE', 'FEMALE']),
    birthDate: z.string(),
    name: z.string().min(2, '이름은 필수입니다.'),
    nickname: z.string().min(2, '닉네임은 필수입니다.'),
    agreedMarketing: z.boolean(),
    agreedAlarm: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export type SignupRequest = z.infer<typeof SignupSchema>
