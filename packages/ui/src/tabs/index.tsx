'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

import { cn } from '@yaksok/utils'
import { type VariantProps, cva } from 'class-variance-authority'

export const tabsTriggerVariants = cva(
  'transition-colors transition-[color,box-shadow] focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-body1',
  {
    variants: {
      variant: {
        dot: [
          'relative px-2 py-1 text-sm font-normal text-[#D0D0D0]',
          'data-[state=active]:text-black data-[state=active]:font-bold',
          'after:absolute after:top-1 after:left-0.5 after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#018381]',
          'after:content-[""] after:hidden data-[state=active]:after:block',
          'after:-translate-y-1/2 after:-translate-x-full',
        ],
        box: [
          'inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full',
          'px-7.5 py-1 text-sm font-medium text-black',
          'data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:z-10',
        ],
        line: [
          'text-subhead2 text-gray05',
          'data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black',
        ],
      },
    },
    defaultVariants: {
      variant: 'dot',
    },
  }
)

type TabsTriggerVariantProps = VariantProps<typeof tabsTriggerVariants>

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex w-fit items-center justify-center gap-2 rounded-lg p-1 text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

type TabsTriggerProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> &
  TabsTriggerVariantProps

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  )
})

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('w-full flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
