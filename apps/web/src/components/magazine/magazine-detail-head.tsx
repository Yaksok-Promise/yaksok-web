import { Tag as TagType } from '@yaksok/api/commentType'
import { BlankHeart } from '@yaksok/icons'
import { IconTag, Tag } from '@yaksok/ui'
import { changeDate } from '@yaksok/utils'
import { Bookmark } from 'lucide-react'

export type HeadProps = {
  likes: number
  scrapCount: number
  date: string
  title: string
  tags: TagType[]
  liked: boolean
  scrapped: boolean
}

export function MagazineDetailHead({
  likes,
  scrapCount,
  date,
  title,
  tags,
  liked,
  scrapped,
}: HeadProps) {
  return (
    <div className="mt-5 mb-6 flex flex-col items-center px-5">
      <div className="mb-6 flex w-full items-center justify-between">
        <span className="text-body2 text-gray04">{changeDate(date)}</span>
        <div className="flex gap-1">
          <IconTag
            icon={
              <BlankHeart
                size={12}
                stroke="#959598"
                fill={liked ? '#959598' : 'none'}
              />
            }
            label={likes.toString()}
            labelClassName="text-gray05 text-body2"
          />
          <IconTag
            icon={
              <Bookmark
                size={12}
                stroke="#959598"
                fill={scrapped ? '#959598' : 'none'}
              />
            }
            label={scrapCount.toString()}
            labelClassName="text-gray05 text-body2"
          />
        </div>
      </div>
      <h1 className="mb-4 text-wrap text-black01 text-head4">{title}</h1>
      <div className="flex items-center gap-1.25">
        {tags.map(tag => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  )
}
