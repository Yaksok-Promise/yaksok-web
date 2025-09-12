import { useCurrentEditor } from '@tiptap/react'
import { MenuBar, Tiptap } from '@yaksok/ui/tiptap'
import React, { useState } from 'react'

export const GeneralForumWrite = () => {
  const [title, setTitle] = useState('')
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
      <Tiptap />
    </div>
  )
}
