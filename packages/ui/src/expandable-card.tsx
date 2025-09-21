'use client'

import { Close } from '@yaksok/icons'
import { cn } from '@yaksok/utils'
import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

export type ExpandableCardProps = {
  title: string
  icon?: React.ReactNode
  items: string[]
  itmeEvent?: (item?: string) => void
  defaultOpen?: boolean
}

export function ExpandableCard({
  title,
  items = [],
  itmeEvent,
  icon,
  defaultOpen = false,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const toggle = () => setOpen(v => !v)

  return (
    <div className="w-full basis-full self-stretch">
      <motion.div
        layout
        className="box-border w-full rounded-[12px] bg-white shadow-box"
      >
        <div
          role="button"
          onClick={toggle}
          className="box-border flex w-full items-center justify-between gap-3 px-3 py-2.5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center rounded-full bg-black01">
              {icon}
            </div>
            <span className="font-semibold text-gray02 text-subhead2">
              {title}
            </span>
          </div>

          {open && (
            <button
              type="button"
              onClick={e => {
                e.stopPropagation()
                setOpen(false)
              }}
              aria-label="닫기"
              className="ml-2 flex h-6 w-6 items-center justify-center"
            >
              <Close size={24} stroke="#48484A" />
            </button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="chips-panel"
              key="chips"
              layout
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="box-border w-full overflow-hidden"
            >
              <div className="flex w-full flex-wrap gap-2 px-3 pt-1 pb-3 ">
                {items.map((item, index) => (
                  <Item
                    key={`item${index}`}
                    item={item}
                    itmeEvent={itmeEvent}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

const itemVariants = cva(
  'rounded-[16px] border-[0.5px] px-3 py-1 text-black text-body2',
  {
    variants: {
      mode: {
        select: 'bg-gray07 border-black01',
        default: 'bg-white border-subGray01',
      },
    },
  }
)

const Item = ({
  item,
  itmeEvent,
  mode = 'default',
}: {
  item: string
  itmeEvent?: (item?: string) => void
  mode?: 'select' | 'default'
}) => {
  const [selectedMode, setSelectedMode] = useState<typeof mode>(mode)
  return (
    <button
      className={cn(itemVariants({ mode: selectedMode }))}
      onClick={e => {
        e.stopPropagation()
        setSelectedMode(v => (v === 'select' ? 'default' : 'select'))
        itmeEvent?.(item)
      }}
    >
      {item}
    </button>
  )
}
