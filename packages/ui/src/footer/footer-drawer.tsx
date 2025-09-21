import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion'

export function FooterDrawer() {
  const mail = 'yaksokkr@gmail.com'
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-black01 text-subhead1" mode="default">
          (주)회사명 사업자 정보
        </AccordionTrigger>
        <AccordionContent>
          <p className="whitespace-pre-line font-normal text-[10px] text-gray03 leading-[18px] tracking-[-0.2px]">
            서울시 00구 00로
            <br />
            대표: 박찬진, 사업자 번호: 000-00-0000
            <br />
            건강기능식품 판매업신고: 제 0000-000000
            <br />
            통신판매업신고: 제 0000-0000-00000호
            <br />
            유통판매업신고: 제 0000-000000호
            <br />
            <a href={'mailto:' + mail}>이메일: {mail}</a>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
