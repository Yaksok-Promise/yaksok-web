import React from 'react'
export type ListTitleProps = {
  title: string
}
export default function ListTitle({ title }: ListTitleProps) {
  return (
    <div className="border-gray03 border-b-[1px] pb-3">
      <h5 className="text-black01 text-head5">{title}</h5>
    </div>
  )
}
