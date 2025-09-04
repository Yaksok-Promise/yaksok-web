import { TextField } from '@yaksok/ui'

export const GeneralForumTextField = () => {
  return (
    <div className="fixed right-0 bottom-0 left-0 flex items-center gap-2 bg-white01 px-4 py-3 shadow-box">
      <TextField
        regex={/\*/}
        message={{}}
        mode="box"
        placeholder="댓글을 입력해 주세요"
        className="bg-gray07"
      />
    </div>
  )
}
