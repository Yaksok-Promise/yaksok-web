import { mergeAttributes } from '@tiptap/core'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import { Placeholder } from '@tiptap/extensions'
import type { Editor } from '@tiptap/react'
import {
  EditorContent,
  EditorContext,
  useCurrentEditor,
  useEditor,
  useEditorState,
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Heading as HeadingIcon,
  Image,
  Italic,
  ListOrdered,
  ListUnderorder,
  StrikeThrough,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  Underline,
} from '@yaksok/icons'
import { ChangeEventHandler, useMemo, useRef } from 'react'
import ImageResize from 'tiptap-extension-resize-image'
import {
  ImageWithMeta,
  fileFromRemoteURL,
  isLikelyImageURL,
  makeImageAttrsFromFile,
} from './image'

const PLACEHOLDER = `공유하고 싶은 이야기를 자유롭게 적어주세요.
    
단, 타인을 비방하거나 부적절한 내용이 포함된 글은 신고 또는 삭제될 수 있어요.`

const HeadingPerLevel = Heading.configure({
  levels: [1, 2, 3, 4, 5, 6],
}).extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = this.options.levels.includes(node.attrs.level)
      ? node.attrs.level
      : this.options.levels[0]

    const classMap: Record<number, string> = {
      1: 'text-head1',
      2: 'text-head2',
      3: 'text-head3',
      4: 'text-head4',
      5: 'text-head5',
      6: 'text-head6',
    }

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: classMap[level],
      }),
      0,
    ]
  },
})

const extensions = [
  TextStyleKit,
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: 'my-2 text-body1 text-black01',
      },
    },
    heading: false,
    blockquote: {
      HTMLAttributes: {
        class:
          'border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4 text-body1',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc ml-6 my-3 space-y-1 text-body1',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal ml-6 my-3 space-y-1 text-body1',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'marker:text-gray-500',
      },
    },
    code: {
      HTMLAttributes: {
        class:
          'rounded bg-gray-100 px-1 py-0.5 font-mono text-[0.9em] text-gray06',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          'rounded-md bg-gray-900 text-gray-100 p-4 font-mono text-sm overflow-x-auto',
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'my-6 border-t border-gray04',
      },
    },
  }),
  Placeholder.configure({
    placeholder: PLACEHOLDER,
  }),
  HeadingPerLevel,
  TextAlign.configure({
    types: ['heading', 'paragraph'], // 어떤 노드에 text-align 허용할지
  }),
  ImageWithMeta.configure({
    inline: true,
    allowBase64: true,
  }),
  ImageResize.configure({
    inline: true,
    allowBase64: true,
  }),
]

export function MenuBar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onPickImage = () => fileInputRef.current?.click()
  const onFileChange: ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const attrs = makeImageAttrsFromFile(file)
    editor.chain().focus().setImage(attrs).run()
    e.currentTarget.value = '' // reset input
  }

  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }),
        isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }),
        isAlignRight: ctx.editor.isActive({ textAlign: 'right' }),
        isAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }),
      }
    },
  })

  return (
    <div className="flex flex-wrap items-center gap-1.25 px-4 py-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <button onClick={onPickImage}>
        <Image size={24} stroke={'#636366'} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
      >
        <Bold size={24} stroke={editorState.isBold ? '#018381' : '#636366'} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
      >
        <Italic
          size={24}
          stroke={editorState.isItalic ? '#018381' : '#636366'}
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editorState.canUnderline}
      >
        <Underline
          size={24}
          stroke={editorState.isUnderline ? '#018381' : '#636366'}
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
      >
        <StrikeThrough
          size={24}
          stroke={editorState.isStrike ? '#018381' : '#636366'}
        />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <HeadingIcon
          size={24}
          stroke={editorState.isHeading1 ? '#018381' : '#636366'}
        />
      </button>

      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <ListUnderorder
          size={24}
          stroke={editorState.isBulletList ? '#018381' : '#636366'}
        />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered
          size={24}
          stroke={editorState.isOrderedList ? '#018381' : '#636366'}
        />
      </button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <TextAlignLeft
          size={24}
          stroke={editorState.isAlignLeft ? '#018381' : '#636366'}
        />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
      >
        <TextAlignCenter
          size={24}
          stroke={editorState.isAlignCenter ? '#018381' : '#636366'}
        />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
      >
        <TextAlignRight
          size={24}
          stroke={editorState.isAlignRight ? '#018381' : '#636366'}
        />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editorState.isAlignJustify ? 'is-active' : ''}
      >
        <TextAlignJustify
          size={24}
          stroke={editorState.isAlignJustify ? '#018381' : '#636366'}
        />
      </button>
    </div>
  )
}

export const Tiptap = () => {
  const { editor } = useCurrentEditor()
  return (
    <div>
      <EditorContent editor={editor} className="min-h-screen p-2" />
    </div>
  )
}

export const TipTapContext = ({ children }: { children: React.ReactNode }) => {
  const editor = useEditor({
    extensions,
    editorProps: {
      handlePaste: (_view, event) => {
        // 이미지 파일 붙여넣기
        const items = event.clipboardData?.items
        const fileItem =
          items && Array.from(items).find(i => i.type.startsWith('image/'))
        if (fileItem) {
          const file = fileItem.getAsFile()
          if (file) {
            event.preventDefault()
            const attrs = makeImageAttrsFromFile(file)
            editor?.chain().focus().setImage(attrs).run()
            return true
          }
        }

        // 이미지 URL 붙여넣기
        const text = event.clipboardData?.getData('text')
        if (text && isLikelyImageURL(text)) {
          event.preventDefault()
          ;(async () => {
            const file = await fileFromRemoteURL(text.trim())
            console.log('file', file)
            const attrs = makeImageAttrsFromFile(file) // 내부에서 registerImageFile 수행
            editor?.chain().focus().setImage(attrs).run()
          })()
          return true
        }
        return false
      },
      handleDrop: (_view, event, _slice, moved) => {
        if (moved) return false
        const files = Array.from(event.dataTransfer?.files || [])
        if (files.length) {
          let handled = false
          files.forEach(file => {
            if (file.type.startsWith('image/')) {
              const attrs = makeImageAttrsFromFile(file)
              editor?.chain().focus().setImage(attrs).run()
              handled = true
            }
          })
          if (handled) {
            event.preventDefault()
            return true
          }
        }
        const text = event.dataTransfer?.getData('text')
        if (text && isLikelyImageURL(text)) {
          event.preventDefault()
          ;(async () => {
            const file = await fileFromRemoteURL(text.trim())
            const attrs = makeImageAttrsFromFile(file)
            editor?.chain().focus().setImage(attrs).run()
          })()
          return true
        }
        return false
      },
      attributes: {
        class: 'min-h-screen p-2 focus:outline-none',
      },
    },
  })

  const providerValue = useMemo(() => ({ editor }), [editor])

  return (
    <EditorContext.Provider value={providerValue}>
      {children}
    </EditorContext.Provider>
  )
}
