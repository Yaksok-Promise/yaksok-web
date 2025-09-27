import { useHttpMutation } from '@/hooks/tanstak/use-http-mutation'
import { useGetToken } from '@/hooks/use-get-token'
import { invalidateQueries } from '@/utils/query-client'
import { splitImagesForEdit } from '@/utils/seperatte-general-forum-img'
import { useFlow } from '@/utils/stackflow'
import { useQueryClient } from '@tanstack/react-query'
import { useCurrentEditor } from '@tiptap/react'

import { Check } from '@yaksok/icons'
import { useMagazineStore } from '@yaksok/store'

export const GeneralForumEditButton = ({ id }: { id: string }) => {
  const { replace } = useFlow()
  const { editor } = useCurrentEditor()
  const { title, tags, category, images, clear, prevImages } =
    useMagazineStore()
  const token = useGetToken()
  const queryClient = useQueryClient()
  const forumEditMutation = useHttpMutation<FormData>(
    '/api/post/general-forum/{postId}',
    'patch',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        postId: id,
      },
    },
    {
      onSuccess: () => {
        clear()
        editor?.commands.clearContent()
        invalidateQueries(queryClient, ['general-forum', id])
        replace('GeneralForumPage', {})
      },
    }
  )
  const handleCreate = async () => {
    if (!editor) return
    const content = editor.getHTML()
    console.log('Original', prevImages, images)
    const { keepImages, newImages, removedImageIds } = splitImagesForEdit({
      prevImages,
      images,
      contentHTML: content,
    })
    console.log('Edited', keepImages, newImages, removedImageIds)
    const formData = new FormData()
    formData.append('title', title)
    tags.forEach(tag => {
      formData.append('tagNames', tag.name)
    })
    if (category !== 'ALL') {
      formData.append('category', category)
    }
    keepImages.forEach(image => {
      formData.append('keepImages', image)
    })
    newImages.forEach(image => {
      formData.append('newImages', image.file)
    })

    formData.append('body', content)
    formData.append('imageGrouped', 'false')

    await forumEditMutation.mutateAsync(formData)
  }
  return (
    <button onClick={handleCreate}>
      <Check size={24} stroke="white" />
    </button>
  )
}
