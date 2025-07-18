import { Tabs as Tab, TabsContent, TabsList, TabsTrigger } from './shadcn/tabs'

export type TabsProps = {
  tabInfo: {
    value: string
    label: string
    content: React.ReactNode
  }[]
  orientation?: 'horizontal' | 'vertical'
  defaultValue?: string
}
export function Tabs({
  tabInfo,
  orientation = 'horizontal',
  defaultValue = tabInfo[0].value,
}: TabsProps) {
  return (
    <Tab defaultValue={defaultValue} orientation={orientation}>
      <TabsList>
        {tabInfo.map(data => (
          <TabsTrigger key={data.value} value={data.value}>
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
