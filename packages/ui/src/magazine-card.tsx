import { Magazine } from '@yaksok/api/boardMagazineType'
import { BlankHeart, Bookmark, CloseMd } from '@yaksok/icons'
import { changeDate } from '@yaksok/utils'
import { ComponentPropsWithoutRef } from 'react'
import { Fallbackimg } from './fallback-img'
import { IconTag } from './icon-tag'
import { Tag } from './tag'

export type MagazineListCardProps = ComponentPropsWithoutRef<'div'> & {
  data: Magazine
  onClickLike?: (id: string) => void
  onClickBookmark?: (id: string) => void
  onClickDelete?: (id: string) => void
  isDelete?: boolean
  liked?: boolean
  scrapped?: boolean
}

export function MagazineListCard({
  data,
  onClickLike,
  onClickBookmark,
  onClickDelete,
  isDelete = false,
  liked = false,
  scrapped = false,
  ...props
}: MagazineListCardProps) {
  const tags = data.tag ? data.tag : data.tags

  return (
    <div
      role="button"
      {...props}
      className="flex max-w-[328px] flex-col border-gray03/20 border-b-[1px] not-first:pt-5"
    >
      {isDelete && (
        <button
          onClick={e => {
            e.stopPropagation()
            onClickDelete?.(data.id)
          }}
          className="self-end"
        >
          <CloseMd size={24} stroke="#000000" />
        </button>
      )}
      <div className="mb-2.5 flex flex-wrap items-center gap-1.25">
        {tags.map((tag, idx) => (
          <Tag key={idx} tag={tag} size="fit" />
        ))}
      </div>
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
            icon={
              <BlankHeart
                size={16}
                stroke="#959598"
                fill={liked ? '#959598' : 'none'}
              />
            }
            label={data.likes.toString()}
            onClick={e => {
              e.stopPropagation()
              onClickLike?.(data.id)
            }}
          />
          <IconTag
            icon={
              <Bookmark
                size={16}
                stroke="#959598"
                fill={scrapped ? '#959598' : 'none'}
              />
            }
            label={data.scrapCount.toString()}
            onClick={e => {
              e.stopPropagation()
              onClickBookmark?.(data.id)
            }}
          />
        </div>
      </div>
    </div>
  )
}
