import styled from '@emotion/styled'
import { Editor } from '@tiptap/react'
import { BubbleMenu, BubbleMenuProps } from '@tiptap/react/menus'
import {
  FormEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { TiptapToolbarAlign } from 'src/components/Editor/TiptapEditor/TiptapToolbarAlign'
import { TiptapToolbarHeadings } from 'src/components/Editor/TiptapEditor/TiptapToolbarHeadings'
import { Flex } from 'src/components/ui'
import { prevent } from 'src/functions/functions'
import {
  IconBold,
  IconClear,
  IconItalic,
  IconLink,
  IconList,
  IconMark,
  IconOrderedList,
  IconQuote,
  IconStrike,
  IconUnderline,
} from './TiptapIcons'
import { TiptapToolbarButton as Button } from './TiptapToolbarButton'
import { TiptapColorPicker } from 'src/components/Editor/TiptapEditor/TiptapColorPicker'
import { TiptapToolbarFormats } from 'src/components/Editor/TiptapEditor/TiptapToolbarFormats'
import { usePartialStore } from 'src/store'
import { t } from 'src/functions/i18n'

type TiptapToolbarProps = {
  editor: Editor
  colors: string[]
}

enum Mode {
  Buttons,
  Link,
}

const iconSize = 16
// Minimum gap between the bubble and the edges of the scrolling sidebar
const toolbarPadding = 8

export function TiptapToolbar({ editor, colors }: TiptapToolbarProps) {
  const [mode, setMode] = useState(Mode.Buttons)
  const setLinkMode = () => setMode(Mode.Link)
  const setButtonsMode = () => setMode(Mode.Buttons)
  // Returns false when Tiptap rejects the URL (the form then stays open)
  const insertLink = (link: string, newTab: boolean): boolean => {
    const attributes = {
      href: link,
      target: newTab ? '_blank' : null,
      rel: newTab ? 'noopener noreferrer' : null,
    }
    if (!editor.can().setLink(attributes)) {
      return false
    }
    // Focusing the editor brings the toolbar back to the buttons mode
    editor.chain().focus().setLink(attributes).run()
    return true
  }
  let rootElement: HTMLElement | null = null
  try {
    rootElement = usePartialStore('rootElement').rootElement
  } catch (e) {
    // Zustand is not available, keep rootElement to null
  }

  useEffect(() => {
    if (editor.isFocused) {
      setMode(Mode.Buttons)
    }
  }, [editor.isFocused])

  return (
    <Toolbar
      className="WysiwygToolbar"
      editor={editor}
      // Without a padding the bubble sticks to the sidebar border when the
      // selection is close to it
      options={{ shift: { padding: toolbarPadding } }}
      shouldShow={({ from, to }) => from !== to}
    >
      {mode === Mode.Link ? (
        <ToolbarLink onSubmit={insertLink} onCancel={setButtonsMode} />
      ) : (
        <ToolbarButtons
          editor={editor}
          onLinkClick={setLinkMode}
          colors={colors}
        />
      )}
    </Toolbar>
  )
}

function ToolbarLink({
  onSubmit,
  onCancel,
}: {
  onSubmit: (link: string, newTab: boolean) => boolean
  onCancel: Function
}) {
  const input = useRef<HTMLInputElement>(null)
  const newTab = useRef<HTMLInputElement>(null)

  // No <form> here: the editor usually sits inside the form of the host page,
  // and a submit event (even prevented) reaches the listeners of that page
  const submit = () => {
    const field = input.current!
    const link = field.value.trim()
    if (!link) {
      onCancel()
      return
    }
    // "www.example.com/page" would be rejected (or saved as a relative link)
    const href = /^www\./i.test(link) ? `https://${link}` : link
    if (!onSubmit(href, newTab.current!.checked)) {
      field.setCustomValidity(t('linkInvalid'))
      field.reportValidity()
    }
  }

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      onCancel()
    }
    if (e.key === 'Enter') {
      // Enter must not submit the host form
      e.preventDefault()
      e.stopPropagation()
      submit()
    }
  }

  const clearValidity: FormEventHandler<HTMLInputElement> = (e) =>
    (e.target as HTMLInputElement).setCustomValidity('')

  return (
    <Flex gap={0.5} onKeyDown={handleKeyDown}>
      <LinkInput
        ref={input}
        type="text"
        placeholder="https://..."
        onInput={clearValidity}
        autoFocus
      />
      <LinkOption title={t('linkNewTabTitle')}>
        <input ref={newTab} type="checkbox" />
        {t('linkNewTab')}
      </LinkOption>
      <Button type="button" onClick={prevent(submit)}>
        {t('linkSubmit')}
      </Button>
    </Flex>
  )
}

function ToolbarButtons({
  editor,
  onLinkClick,
  colors,
}: TiptapToolbarProps & { onLinkClick: Function }) {
  const clearFormat = () =>
    editor.chain().focus().clearNodes().unsetAllMarks().run()

  const toggleLink = () => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()
    } else {
      onLinkClick()
    }
  }

  return (
    <>
      {editor.can().toggleOrderedList() && (
        <Button
          onClick={prevent(() =>
            editor.chain().focus().toggleOrderedList().run()
          )}
          active={editor.isActive('orderedList')}
          title={t('orderedList')}
        >
          <IconOrderedList size={iconSize} />
        </Button>
      )}
      {editor.can().toggleBulletList() && (
        <Button
          onClick={prevent(() =>
            editor.chain().focus().toggleBulletList().run()
          )}
          active={editor.isActive('bulletList')}
          title={t('bulletList')}
        >
          <IconList size={iconSize} />
        </Button>
      )}
      {editor.can().toggleBlockquote() && (
        <Button
          onClick={prevent(() =>
            editor.chain().focus().toggleBlockquote().run()
          )}
          active={editor.isActive('blockquote')}
          title={t('blockquote')}
        >
          <IconQuote size={iconSize} />
        </Button>
      )}
      <TiptapToolbarHeadings editor={editor} />
      {editor.can().toggleBulletList() && <Separator />}
      <TiptapToolbarAlign editor={editor} />
      <Button
        onClick={prevent(() => editor.chain().focus().toggleBold().run())}
        active={editor.isActive('bold')}
        title={t('bold')}
      >
        <IconBold size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleItalic().run())}
        active={editor.isActive('italic')}
        title={t('italic')}
      >
        <IconItalic size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleUnderline().run())}
        active={editor.isActive('underline')}
        title={t('underline')}
      >
        <IconUnderline size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleHighlight().run())}
        active={editor.isActive('highlight')}
        title={t('highlight')}
      >
        <IconMark size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleStrike().run())}
        active={editor.isActive('strike')}
        title={t('strike')}
      >
        <IconStrike size={iconSize} />
      </Button>
      <TiptapColorPicker editor={editor} colors={colors} />
      <TiptapToolbarFormats editor={editor} />
      <Separator />
      <Button
        onClick={prevent(toggleLink)}
        active={editor.isActive('link')}
        title={t('link')}
      >
        <IconLink size={iconSize} />
      </Button>
      <Button onClick={prevent(clearFormat)} title={t('clearFormat')}>
        <IconClear size={iconSize} />
      </Button>
    </>
  )
}

const Toolbar = styled(BubbleMenu)({
  borderRadius: 25,
  backgroundColor: '#444',
  color: '#FFF',
  height: 40,
  display: 'flex',
  // Keep the 14 buttons within the minimum sidebar width (450px)
  padding: '0 .5em',
}) as FunctionComponent<PropsWithChildren<BubbleMenuProps>>

const Separator = styled.div({
  width: '.5em',
  flex: 'none',
})

const LinkInput = styled.input({
  border: 'none',
  height: 30,
  color: 'inherit',
  font: 'inherit',
  background: 'transparent',
  outline: 'none',
})

const LinkOption = styled.label({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flex: 'none',
  fontSize: 12,
  whiteSpace: 'nowrap',
  color: '#CCC',
  cursor: 'pointer',
  '&:hover': {
    color: '#FFF',
  },
  input: {
    margin: 0,
    cursor: 'pointer',
  },
})
