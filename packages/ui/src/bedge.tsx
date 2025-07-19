import { ComponentPropsWithoutRef } from 'react'

export type BedgeProps = {
  miniTitle: string
  title: string
  description: string
} & ComponentPropsWithoutRef<'div'>

export function Bedge({ miniTitle, title, description, ...props }: BedgeProps) {
  return (
    <div
      className="flex min-h-[176px] min-w-40 flex-col gap-4 rounded-2xl bg-white01 px-5 py-10 shadow-basic2 "
      {...props}
    >
      <div className="flex flex-col">
        <span className="text-[#018381] text-subhead3">{miniTitle}</span>
        <h1 className="text-gray01 text-subhead1">{title}</h1>
      </div>
      <div>
        <p className="whitespace-pre-line text-balance text-caption1 text-gray02">
          {description}
        </p>
      </div>
    </div>
  )
}
