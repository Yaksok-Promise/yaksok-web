import { useCurrentEditor } from '@tiptap/react'
import { useMagazineStore } from '@yaksok/store'
import { TagInput } from '@yaksok/ui'
import { MenuBar, Tiptap } from '@yaksok/ui/tiptap'
import { useEffect } from 'react'

type GeneralForumEditProps = {
  content: string
}
export const GeneralForumEdit = ({ content }: GeneralForumEditProps) => {
  const { tags, setTags, title, setTitle } = useMagazineStore()
  const { editor } = useCurrentEditor()

  useEffect(() => {
    if (!editor) return
    editor.commands.setContent(content)
  }, [editor, content])

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
    </div>
  )
}
