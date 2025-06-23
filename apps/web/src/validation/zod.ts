import { z } from 'zod'

export const SignupSchema = z.object({
  loginId: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  phoneNumber: z
    .string()
    .regex(/^010-\d{4}-\d{4}$/, '휴대폰 번호 형식이 올바르지 않습니다.'),
  gender: z.enum(['MALE', 'FEMALE']),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '생년월일 형식은 YYYY-MM-DD여야 합니다.'),
  name: z.string().min(1, '이름은 필수입니다.'),
  nickname: z.string().min(1, '닉네임은 필수입니다.'),
  agreedMarketing: z.boolean(),
  agreedAlarm: z.boolean(),
})

export type SignupRequest = z.infer<typeof SignupSchema>
