import { useHttpMutation } from '@/hooks/tanstak/use-http-mutation'
import { useGetToken } from '@/hooks/use-get-token'
import { useFlow } from '@/utils/stackflow'
import { Editor, useCurrentEditor } from '@tiptap/react'
import { Check } from '@yaksok/icons'
import { magazineStore, useMagazineStore } from '@yaksok/store'

export const GeneralForumCreateButton = () => {
  const { replace } = useFlow()
  const { editor } = useCurrentEditor()
  const { title, tags, category, images, clear } = useMagazineStore()
  const token = useGetToken()
  const forumCreateMutation = useHttpMutation<FormData>(
    '/api/post/general-forum/create',
    'post',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    {
      onSuccess: () => {
        clear()
        editor?.commands.clearContent()
        replace('GeneralForumPage', {})
      },
    }
  )
  const handleCreate = async () => {
    if (!editor) return
    const formData = new FormData()
    formData.append('title', title)
    tags.forEach(tag => {
      formData.append('tagNames', tag.name)
    })
    if (category !== 'ALL') {
      console.log(category)
      formData.append('category', category)
    }
    images.forEach(image => {
      formData.append('images', image)
    })
    const content = editor.getHTML()
    formData.append('body', content)
    formData.append('imageGrouped', 'false')

    await forumCreateMutation.mutateAsync(formData)
  }
  return (
    <button onClick={handleCreate}>
      <Check size={24} stroke="white" />
    </button>
  )
}

function normalizeImagesForSubmit(editor: Editor) {
  const { images } = magazineStore.getState()
  const files: File[] = []
  let index = 0

  const tr = editor.state.tr
  editor.state.doc.descendants((node, pos) => {
    const name: string | undefined = node.attrs?.alt
    console.log('name', name)
    const file = images.get(name!)
    console.log('imageFile', file)
    if (!file) return

    const cid = `cid:${index}`
    files.push(file)

    // src 를 cid로, data-index를 부여
    tr.setNodeMarkup(pos, undefined, {
      ...node.attrs,
      name: cid,
      'data-index': index,
    })
    index += 1
  })
  if (tr.steps.length) editor.view.dispatch(tr)
  const bodyWithCid = editor.getHTML()
  console.log(bodyWithCid)
  //   return { bodyWithCid, files }
}
