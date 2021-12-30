import { BubbleMenu, Editor } from '@tiptap/react'
import { prevent } from 'src/functions/functions'
import styled from '@emotion/styled'
import { TiptapToolbarButton as Button } from './TiptapToolbarButton'
import {
  IconBold,
  IconClear,
  IconHeading,
  IconItalic,
  IconLink,
  IconList,
  IconMark,
  IconOrderedList,
  IconUnderline,
} from './TiptapIcons'
import { Flex } from 'src/components/ui'
import { FormEventHandler, KeyboardEventHandler, useState } from 'react'
import { TiptapToolbarAlign } from 'src/components/Editor/TiptapEditor/TiptapToolbarAlign'

type TiptapToolbarProps = {
  editor: Editor
}

enum Mode {
  Buttons,
  Link,
}

const iconSize = 16

export function TiptapToolbar({ editor }: TiptapToolbarProps) {
  const [mode, setMode] = useState(Mode.Buttons)
  const setLinkMode = () => setMode(Mode.Link)
  const setButtonsMode = () => setMode(Mode.Buttons)
  const insertLink = (link: string) => {
    editor.commands.setLink({ href: link })
  }

  return (
    <Toolbar
      editor={editor}
      shouldShow={({ from, to }) => from !== to}
      tippyOptions={{
        maxWidth: 500,
        // appendTo: (div) => div.closest('visual-editor')!
      }}
    >
      {mode === Mode.Link ? (
        <ToolbarLink onSubmit={insertLink} onCancel={setButtonsMode} />
      ) : (
        <ToolbarButtons editor={editor} onLinkClick={setLinkMode} />
      )}
    </Toolbar>
  )
}

function ToolbarLink({
  onSubmit,
  onCancel,
}: {
  onSubmit: (l: string) => void
  onCancel: Function
}) {
  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') {
      onCancel()
    }
  }

  const handleSubmit: FormEventHandler = (e) => {
    const data = new FormData(e.target as HTMLFormElement)
    const link = data.get('link')
    if (link) {
      onSubmit(link.toString())
    } else {
      onCancel(link)
    }
  }

  return (
    <Flex as="form" onKeyDown={handleKeyDown} onSubmit={prevent(handleSubmit)}>
      <LinkInput name="link" type="text" placeholder="https://..." autoFocus />
      <Button>Ok</Button>
    </Flex>
  )
}

function ToolbarButtons({
  editor,
  onLinkClick,
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
        >
          <IconList size={iconSize} />
        </Button>
      )}
      {([2, 3, 4] as const)
        .filter((level) => editor.can().toggleHeading({ level }))
        .map((level) => (
          <Button
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            active={editor.isActive('heading', { level })}
          >
            <IconHeading size={iconSize} level={level} />
          </Button>
        ))}
      {editor.can().toggleBulletList() && <Separator />}
      <TiptapToolbarAlign editor={editor} />
      <Button
        onClick={prevent(() => editor.chain().focus().toggleBold().run())}
        active={editor.isActive('bold')}
      >
        <IconBold size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleItalic().run())}
        active={editor.isActive('italic')}
      >
        <IconItalic size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleUnderline().run())}
        active={editor.isActive('underline')}
      >
        <IconUnderline size={iconSize} />
      </Button>
      <Button
        onClick={prevent(() => editor.chain().focus().toggleHighlight().run())}
        active={editor.isActive('highlight')}
      >
        <IconMark size={iconSize} />
      </Button>
      <Separator />
      <Button onClick={prevent(toggleLink)} active={editor.isActive('link')}>
        <IconLink size={iconSize} />
      </Button>
      <Button onClick={prevent(clearFormat)}>
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
  padding: '0 1em',
})

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
