import { cn } from '@yaksok/utils'
import { Tabs as Tab, TabsContent, TabsList, TabsTrigger } from './tabs/index'

export type TabsProps = {
  tabInfo: {
    value: string
    label: string
    content: React.ReactNode
  }[]
  variant?: 'dot' | 'box' | 'line'
  orientation?: 'horizontal' | 'vertical'
  defaultValue?: string
  wrapperClassName?: string
}
export function Tabs({
  tabInfo,
  wrapperClassName,
  orientation = 'horizontal',
  defaultValue = tabInfo[0].value,
  variant = 'dot',
}: TabsProps) {
  return (
    <Tab
      defaultValue={defaultValue}
      orientation={orientation}
      className={wrapperClassName}
    >
      <TabsList
        className={cn(variant === 'box' && 'rounded-full bg-[#e3e3e3]/70')}
      >
        {tabInfo.map(data => (
          <TabsTrigger key={data.value} value={data.value} variant={variant}>
            {data.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabInfo.map(data => (
        <TabsContent value={data.value} key={data.value}>
          {data.content}
        </TabsContent>
      ))}
    </Tab>
  )
}
