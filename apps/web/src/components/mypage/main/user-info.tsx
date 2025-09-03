import { Profile } from '@yaksok/ui'

type UserInfoProps = {
  email: string
  name: string
  profileUrl: string
}
export function UserInfo({ email, name, profileUrl }: UserInfoProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <h5 className="whitespace-pre-line text-black01 text-head5">{`${name}님,\n안녕하세요!`}</h5>
        <p className="text-body2 text-gray05">{email}</p>
      </div>
      <Profile profileUrl={profileUrl} size={64} />
    </div>
  )
}
