export type Gender = 'MALE' | 'FEMALE'
export type SMSType = 'SIGN_UP' | 'FIND_ID' | 'FIND_PWD' | 'CHANGE_PHONE'

// user api request type
export type SignupRequest = {
  loginId: string
  password: string
  phoneNumber: string
  gender: Gender
  birthDate: string
  name: string
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

export type SMSVerifyRequest = {
  code: string
  phone: string
  smsType: SMSType
}

export type SendSMSRequest = {
  phone: string
  smsType: SMSType
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

export type SMSTestResponse = {
  response: string
}
