import { Tag as TagType } from '@yaksok/api/commentType'
import { CloseSm, Plus } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { VariantProps, cva } from 'class-variance-authority'
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

const tagVariants = cva(
  'flex items-center justify-center rounded-[4px] bg-[#E3E3E3]/50 px-1.5 py-0.5',
  {
    variants: {
      size: {
        full: 'w-full',
        fit: 'w-fit',
      },
    },
    defaultVariants: {
      size: 'fit',
    },
  }
)

export type TagProps = Omit<ComponentPropsWithoutRef<'div'>, 'prefix'> &
  VariantProps<typeof tagVariants> & {
    tag: TagType
    prefix?: ReactNode
    onDelete?: () => void
  }

export function Tag({
  tag,
  className,
  prefix = <span className="text-gray03 text-subHead3">#</span>,
  size = 'fit',
  onDelete,
  ...props
}: TagProps) {
  const label = tag.name
  return (
    <div className={cn(tagVariants({ size }), className)} {...props}>
      {prefix}
      <span className="text-gray03 text-subHead3">{label}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-0.5 flex items-center justify-center"
        >
          <CloseSm size={16} stroke="#636366" />
        </button>
      )}
    </div>
  )
}

export type TagInputProps = {
  value?: TagType[]
  onChange?: (tags: TagType[]) => void
  maxTags?: number
  placeholder?: string
  tagMaxLength?: number
  className?: string
}

export function TagInput({
  value,
  onChange,
  maxTags = 3,
  placeholder = '관련 키워드를 최대 3개까지 입력할 수 있어요',
  tagMaxLength = 20,
  className,
}: TagInputProps) {
  const [tags, setTags] = useState<TagType[]>(value ?? [])
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) setTags(value)
  }, [value])

  useEffect(() => {
    onChange?.(tags)
  }, [tags, onChange])

  const canAddMore = tags.length < maxTags

  const commit = (raw?: string) => {
    const base = typeof raw === 'string' ? raw : input
    const cleaned = base.replace(/[#,]/g, '').trim()
    if (!cleaned) return
    if (cleaned.length > tagMaxLength) return
    if (tags.some(t => t.name === cleaned)) return
    if (!canAddMore) return
    setTags(prev => [...prev, { id: crypto.randomUUID(), name: cleaned }])
    setInput('')
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (isComposing) return
    if (['Enter', ' ', ','].includes(e.key)) {
      e.preventDefault()
      commit()
    } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
      e.preventDefault()
      setTags(prev => prev.slice(0, -1))
    }
  }

  const onBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    commit()
    if (tags.length < maxTags) setEditing(false)
  }

  const focusInput = () => {
    setEditing(true)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const handleRemove = (idx: number) => {
    setTags(prev => prev.filter((_, i) => i !== idx))
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex flex-wrap items-center gap-2 rounded-md px-2 py-2">
        {!editing && tags.length === 0 && (
          <div className="flex items-center gap-0.5 rounded-md bg-[#E3E3E3]/50 px-2 py-1">
            <div className="text-gray05 text-subHead2">#</div>
            <div
              className="text-gray05 text-subHead2"
              onClick={() => setEditing(true)}
            >
              {placeholder}
            </div>
          </div>
        )}
        {tags.length > 0 &&
          tags.map((tag, i) => (
            <div key={tag.id} className="flex items-center gap-1">
              <Tag tag={tag} onDelete={() => handleRemove(i)} />
            </div>
          ))}

        {canAddMore && editing && (
          <div className="relative rounded-md bg-[#E3E3E3]/50">
            <span className="-translate-y-1/2 absolute top-1/2 left-2 text-gray05">
              #
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              onBlur={onBlur}
              onFocus={() => setEditing(true)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              className="h-8 w-auto rounded-md border border-transparent pr-2 pl-6 text-gray03 text-sm outline-none"
            />
          </div>
        )}

        {canAddMore && tags.length > 0 && !editing && (
          <button
            type="button"
            onClick={focusInput}
            className="h-7.5 rounded-md bg-[#E3E3E3]/50 px-2 text-gray-600 text-sm"
          >
            <Plus size={16} stroke="#636366" />
          </button>
        )}
      </div>
    </div>
  )
}
