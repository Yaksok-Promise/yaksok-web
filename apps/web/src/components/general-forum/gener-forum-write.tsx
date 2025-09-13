import { useCurrentEditor } from '@tiptap/react'
import { useMagazineStore } from '@yaksok/store'
import { TagInput } from '@yaksok/ui'
import { MenuBar, Tiptap } from '@yaksok/ui/tiptap'

export const GeneralForumWrite = () => {
  const { tags, setTags, title, setTitle } = useMagazineStore()
  const { editor } = useCurrentEditor()
  return (
    <div className="w-full">
      <input
        type="text"
        maxLength={30}
        placeholder="제목을 입력해주세요(최대 30자)"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border-gray03/20 border-b-1 px-4 pt-5 pb-1 text-subhead1 placeholder:text-gray05 placeholder:text-subhead1 focus:outline-none"
      />
      <MenuBar editor={editor!} />
      <TagInput value={tags} onChange={setTags} />
      <Tiptap />
      <button onClick={() => console.log(tags)}>태그 확인</button>
    </div>
  )
}
