import { BottomsheetLikeBackground } from '@/components/common/bottomsheet-like-background'
import { AppScreen } from '@stackflow/plugin-basic-ui'

export default function MagazineYakinStoryPage() {
  return (
    <AppScreen
      appBar={{
        title: '',
        textColor: '#ffffff',
        iconColor: '#ffffff',
        backgroundColor: '#000000',
        border: false,
      }}
    >
      <BottomsheetLikeBackground>
        <div className="flex h-full flex-col gap-5 rounded-t-full bg-white px-6 pt-11">
          <h1 className="text-gray01 text-head6">YAKINSTORY</h1>
          <div className="w-25 border-2 border-gray02" />
          <p className="whitespace-pre-wrap text-black01 text-body2">
            안녕하세요, YAKIN입니다.
          </p>
          <p className="whitespace-pre-wrap text-black01 text-body2">
            YAKIN은 약사가 직접 전하는 제약·건강 정보와에디터들이 풀어내는
            웰니스 라이프스타일을 담는 매거진입니다.
          </p>
          <p className="whitespace-pre-wrap text-black01 text-body2">
            우리는 복잡한 약 이야기를 일상에서 바로 쓸 수 있도록 쉽게
            풀어내고,건강 관리에 꼭 필요한 팁부터 최신 제약 트렌드까지 알차게
            전합니다.
          </p>
          <p className="whitespace-pre-wrap text-black01 text-body2">
            작은 습관이 큰 변화를 만든다고 믿습니다.YAKIN과 함께 건강한 변화를
            시작해보세요 🌿
          </p>
        </div>
      </BottomsheetLikeBackground>
    </AppScreen>
  )
}
