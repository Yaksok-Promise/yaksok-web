import { Tag as TagType } from '@yaksok/api/commentType'
import { Profile, Tag } from '@yaksok/ui'
import { changeDate } from '@yaksok/utils'

export type GeneralForumDetailProps = {
  title: string
  tags: TagType[]
  author: string
  date: string
}

export function GeneralForumTitle({
  title,
  tags,
  author,
  date,
}: GeneralForumDetailProps) {
  return (
    <div className="flex flex-col gap-4 border-gray03 border-b-2 pt-5 pb-4">
      <div className="flex items-center gap-1.5">
        <Profile size={36} />
        <div className="flex flex-col">
          <p className="text-caption1 text-gray02">{author}</p>
          <p className="text-caption1 text-gray02">
            {changeDate(date, 'time')}
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-wrap text-head5">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {tags.map(tag => (
          <Tag key={tag.id} tag={tag} size="fit" />
        ))}
      </div>
    </div>
  )
}
