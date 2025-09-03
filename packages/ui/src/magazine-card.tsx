import { Magazine } from '@yaksok/api/boardMagazineType'
import { BlankHeart, Bookmark, SvgIconElement } from '@yaksok/icons'
import { changeDate } from '@yaksok/utils'
import { ComponentPropsWithoutRef } from 'react'
import { Fallbackimg } from './fallback-img'
import { IconTag } from './icon-tag'

export type MagazineListCardProps = ComponentPropsWithoutRef<'div'> & {
  data: Magazine
}

export function MagazineListCard({ data, ...props }: MagazineListCardProps) {
  return (
    <div
      role="button"
      {...props}
      className="flex max-w-[328px] flex-col border-gray03/20 border-b-[1px]"
    >
      <div className="mb-2 flex h-20 w-full justify-between">
        <h1 className="h-full w-[69.5%] overflow-hidden text-ellipsis text-head6">
          {data.title}
        </h1>
        <Fallbackimg
          src={
            data.hasImages && data.thumbnailUrl ? data.thumbnailUrl : undefined
          }
          alt={data.title}
          imgClassName="w-20 h-20"
          wrapperClassName="w-20 h-20 bg-gray01"
        />
      </div>
      <div className="mb-4 flex w-full items-center justify-between">
        <span className="text-caption1 text-gray04">
          {changeDate(data.createdAt)}
        </span>
        <div className="flex gap-1">
          <IconTag
            icon={<BlankHeart size={12} stroke="#959598" />}
            label={data.likes.toString()}
          />
          <IconTag
            icon={<Bookmark size={12} stroke="#959598" />}
            label={data.views.toString()}
          />
        </div>
      </div>
    </div>
  )
}
