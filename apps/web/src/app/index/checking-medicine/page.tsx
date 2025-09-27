import { AppScreen } from '@stackflow/plugin-basic-ui'
import { Search } from '@yaksok/ui'
import { Tabs, TabsList, TabsTrigger } from '@yaksok/ui/tabs'
import { useState } from 'react'

export default function CheckingMedicinePage() {
  return (
    <AppScreen
      appBar={{
        title: '일반의약품 및 건강기능식품 성분',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        iconColor: '#000000',
        border: false,
      }}
    >
      <div>
        <CheckingMedicineTabAndSearch />
      </div>
    </AppScreen>
  )
}

const CheckingMedicineTabAndSearch = () => {
  const [value, setValue] = useState<'medicine' | 'health-food'>('medicine')
  const triggerList = [
    { value: 'medicine', label: '일반의약품' },
    { value: 'health-food', label: '건강기능식품' },
  ]
  return (
    <div className="bg-white">
      <Tabs
        onValueChange={value => setValue(value as 'medicine' | 'health-food')}
        value={value}
        className="w-full bg-white"
      >
        <TabsList className="relative w-full gap-2.5 px-5">
          {triggerList.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} variant="line">
              <span>{label}</span>
            </TabsTrigger>
          ))}
          <div className="absolute right-0 bottom-1 left-0 h-1 bg-black" />
        </TabsList>
      </Tabs>
      <div className="flex items-center justify-center bg-white px-4 py-11">
        <Search
          placeholder="의약품 또는 건강기능식품 성분을 입력해주세요"
          className="text-caption1 placeholder:text-gray03"
          wrapperClassName="bg-bgColor"
        />
      </div>
    </div>
  )
}
