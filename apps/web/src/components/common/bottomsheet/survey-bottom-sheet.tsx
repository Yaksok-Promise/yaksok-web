import { BottomSheet } from '@stackflow/plugin-basic-ui'

export const SurveyBottomSheetActivity = () => {
  return (
    <BottomSheet dimBackgroundColor="rgba(0,0,0,0.4)" borderRadius="16px">
      <div className="p-4">
        <h2 className="text-subhead1">검단 문진 하러 가기</h2>
        {/* ... */}
      </div>
    </BottomSheet>
  )
}
