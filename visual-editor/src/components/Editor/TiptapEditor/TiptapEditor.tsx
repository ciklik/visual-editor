import styled from '@emotion/styled'
import { Node } from '@tiptap/core'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import Highlight from '@tiptap/extension-highlight'
import History from '@tiptap/extension-history'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import { TiptapToolbar } from 'src/components/Editor/TiptapEditor/TiptapToolbar'
import { Styles } from 'src/components/ui'

const SingleDocument = Node.create({
  name: 'doc',
  topNode: true,
  group: 'block',
  content: 'inline*',
})

// Superscript and subscript cannot apply to the same text
const ExclusiveSuperscript = Superscript.extend({ excludes: 'subscript' })
const ExclusiveSubscript = Subscript.extend({ excludes: 'superscript' })
// Tiptap's Code excludes every other mark by default, here it combines
// with bold, links, colors... like any other format
const InlineCode = Code.extend({ excludes: '' })

type TiptapEditorProps = {
  value: string
  onChange: (v: string) => void
  colors?: string[]
  backgroundColor?: string
  color?: string
  multiline?: boolean
  defaultAlign?: 'left' | 'right' | 'center' | 'justify'
}

export function TiptapEditor({
  value,
  onChange,
  multiline = false,
  colors = [],
  defaultAlign,
  backgroundColor,
  color,
}: TiptapEditorProps) {
  const [isFocused, setFocus] = useState(false)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const editor = useEditor({
    extensions: [
      ...(multiline ? [Document] : [SingleDocument]),
      Paragraph,
      OrderedList,
      BulletList,
      ListItem,
      Text,
      Bold,
      Italic,
      Highlight,
      Underline,
      Strike,
      ExclusiveSuperscript,
      ExclusiveSubscript,
      InlineCode,
      // TextStyleKit already registers the Color extension (setColor / unsetColor)
      TextStyleKit,
      HardBreak,
      History,
      Blockquote,
      Link.configure({
        openOnClick: false,
        // Links open in the same tab unless the user asks for a new one
        HTMLAttributes: { target: null, rel: null },
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      TextAlign.configure({
        types: [
          'heading',
          'bulletList',
          'listItem',
          'orderedList',
          'blockquote',
          'paragraph',
        ],
        defaultAlignment: defaultAlign,
      }),
    ],
    onUpdate: ({ editor }) =>
      onChangeRef.current(cleanHTML(editor.getHTML(), multiline)),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    content: value,
  })

  // Update the default alignment for the TextAlign extension
  useEffect(() => {
    if (editor) {
      editor.extensionManager.extensions.find(
        (e) => e.name === 'textAlign'
      )!.options.defaultAlignment = defaultAlign
      // Reset the content to reset the default alignment
      editor.commands.setContent(value)
    }
  }, [defaultAlign])

  return (
    <EditorWrapper
      focused={isFocused}
      style={{ textAlign: defaultAlign, color, backgroundColor }}
    >
      <EditorContent editor={editor} />
      {editor && <TiptapToolbar editor={editor} colors={colors} />}
    </EditorWrapper>
  )
}

/**
 * Tiptap output <p> inside <li>, we need to do some cleanup
 */
const cleanHTML = (str: string, multiline: boolean) => {
  let content = str.replaceAll(
    /(<[uo]l[^>]*>)(.*?)(<\/[uo]l>)/gi,
    (_, openingTag, inner, closingTag) =>
      `${openingTag}${removeParagraphs(inner)}${closingTag}`
  )
  if (!multiline) {
    content = removeParagraphs(content)
  }
  return content.trim()
}

function removeParagraphs(str: string) {
  return str
    .replaceAll(/<\/p><p[^>]*>/gi, '<br>')
    .replaceAll(/<p[^>]*>/gi, '')
    .replaceAll(/<\/p>/gi, '')
}

const EditorWrapper = styled.div<{ focused: boolean; singleLine?: boolean }>(
  {
    color: 'var(--ve-color)',
    background: 'transparent',
    padding: '.5rem .75em',
    lineHeight: '1.25rem',
    borderRadius: '.2rem',
    display: 'block',
    width: '100%',
    border: 'solid 1px var(--ve-field-border)',
    boxShadow: 'var(--ve-field-shadow)',
    outline: 'none',
    'p, ul, ol, h2, h3, h4, h5, h1': {
      margin: '0 0 1em 0',
    },
    'li p': {
      margin: 0,
    },
    '.ProseMirror': {
      outline: 'none',
    },
    '.ProseMirror > *:last-child': {
      margin: 0,
    },
    '.ProseMirror-focused ~ div': {
      zIndex: 200,
    },
  },
  (props) => ({
    ...(props.focused ? Styles.FocusState : undefined),
    p: {
      marginBottom: props.singleLine ? '0' : '1em',
    },
  })
)
