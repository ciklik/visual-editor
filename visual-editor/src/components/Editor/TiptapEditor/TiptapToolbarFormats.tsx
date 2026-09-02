import { Editor } from '@tiptap/core'
import { FunctionComponent } from 'react'
import { prevent } from 'src/functions/functions'
import { TiptapDropdown as Dropdown } from './TiptapDropdown'
import { IconCode, IconSubscript, IconSuperscript } from './TiptapIcons'
import { TiptapToolbarButton as Button } from './TiptapToolbarButton'

type FormatDefinition = {
  name: 'superscript' | 'subscript' | 'code'
  title: string
  Icon: FunctionComponent<{ size: number }>
}

const superscript: FormatDefinition = {
  name: 'superscript',
  title: 'Superscript',
  Icon: IconSuperscript,
}

const formats: FormatDefinition[] = [
  superscript,
  { name: 'subscript', title: 'Subscript', Icon: IconSubscript },
  { name: 'code', title: 'Code', Icon: IconCode },
]

/**
 * Secondary inline formats (superscript, subscript, code) grouped in a
 * dropdown to keep the toolbar narrow. The main button reflects the first
 * active format (superscript when none is active), the others show on hover.
 * Superscript / subscript exclusivity is enforced by the schema (see
 * TiptapEditor), so a plain toggle is enough here.
 */
export const TiptapToolbarFormats: FunctionComponent<{ editor: Editor }> = ({
  editor,
}) => {
  const current =
    formats.find((format) => editor.isActive(format.name)) ?? superscript

  const toggle = (format: FormatDefinition) =>
    prevent(() => editor.chain().focus().toggleMark(format.name).run())

  return (
    <Dropdown size={formats.length}>
      <Button
        active={editor.isActive(current.name)}
        onClick={toggle(current)}
        title={current.title}
      >
        <current.Icon size={16} />
      </Button>
      {formats
        .filter((format) => format.name !== current.name)
        .map((format) => (
          <Button
            key={format.name}
            active={editor.isActive(format.name)}
            onClick={toggle(format)}
            css={{ height: 30 }}
            title={format.title}
          >
            <format.Icon size={16} />
          </Button>
        ))}
    </Dropdown>
  )
}
