import styled from '@emotion/styled'
import { Editor } from '@tiptap/react'
import { BubbleMenu, BubbleMenuProps } from '@tiptap/react/menus'
import {
  FormEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  PropsWithChildren,
  useEffect,
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
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  const handleSubmit: FormEventHandler = (e) => {
    const form = e.target as HTMLFormElement
    const input = form.elements.namedItem('link') as HTMLInputElement
    const data = new FormData(form)
    const link = data.get('link')?.toString().trim()
    if (!link) {
      onCancel()
      return
    }
    // "www.example.com/page" would be rejected (or saved as a relative link)
    const href = /^www\./i.test(link) ? `https://${link}` : link
    if (!onSubmit(href, data.get('newTab') === 'on')) {
      input.setCustomValidity('Invalid URL, add "https://"')
      input.reportValidity()
    }
  }

  const clearValidity: FormEventHandler<HTMLInputElement> = (e) =>
    (e.target as HTMLInputElement).setCustomValidity('')

  return (
    <Flex
      as="form"
      gap={0.5}
      onKeyDown={handleKeyDown}
      onSubmit={prevent(handleSubmit)}
    >
      <LinkInput
        name="link"
        type="text"
        placeholder="https://..."
        onInput={clearValidity}
        autoFocus
      />
      <LinkOption title="Open the link in a new tab">
        <input type="checkbox" name="newTab" />
        New tab
      </LinkOption>
      <Button>Ok</Button>
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
          title="Ordered List"
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
          title="Unordered List"
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
          title="Blockquote"
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
        title="Bold"
      >
        <IconBold size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleItalic().run())}
        active={editor.isActive('italic')}
        title="Italic"
      >
        <IconItalic size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleUnderline().run())}
        active={editor.isActive('underline')}
        title="Underline"
      >
        <IconUnderline size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleHighlight().run())}
        active={editor.isActive('highlight')}
        title="Mark"
      >
        <IconMark size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleStrike().run())}
        active={editor.isActive('strike')}
        title="Strike"
      >
        <IconStrike size={iconSize} />
      </Button>
      <TiptapColorPicker editor={editor} colors={colors} />
      <TiptapToolbarFormats editor={editor} />
      <Separator />
      <Button
        onClick={prevent(toggleLink)}
        active={editor.isActive('link')}
        title="Link"
      >
        <IconLink size={iconSize} />
      </Button>
      <Button onClick={prevent(clearFormat)} title="Clear">
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
