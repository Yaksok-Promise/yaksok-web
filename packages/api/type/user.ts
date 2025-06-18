export type Gender = 'MALE' | 'FEMALE'

// user api request type
export type SignupRequest = {
  loginId: string
  password: string
  phoneNumber: string
  gender: Gender
  birthDate: string
  name: string
  nickname: string
  agreedMarketing: boolean
  agreedAlarm: boolean
}

export type ResetPasswordRequest = {
  loginId: string
  name: string
  phoneNumber: string
  newPassword: string
}

export type LoginRequest = {
  loginId: string
  password: string
}

export type FindIdRequest = {
  name: string
  phoneNumber: string
}

export type ChangePasswordRequest = {
  oldPassword: string
  newPassword: string
}

// user api response type
export type UserInfoResponse = {
  name: string
  nickname: string
  loginId: string
  phoneNumber: string
  gender: string
  birthDate: string
}

export type CheckResultResponse = {
  result: boolean
}
