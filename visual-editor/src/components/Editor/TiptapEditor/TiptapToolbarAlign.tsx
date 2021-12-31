import { FunctionComponent } from 'react'
import { IconAlign } from './TiptapIcons'
import { Editor } from '@tiptap/core'
import { TiptapToolbarButton as Button } from './TiptapToolbarButton'
import { TiptapDropdown as Dropdown } from './TiptapDropdown'

export const TiptapToolbarAlign: FunctionComponent<{ editor: Editor }> = ({
  editor,
}) => {
  const alignments = ['left', 'center', 'right', 'justify'] as const
  const currentAlign = alignments.filter((align) =>
    editor.isActive({ textAlign: align })
  )[0]!

  if (!editor.can().setParagraph()) {
    return null
  }

  return (
    <Dropdown size={alignments.length}>
      <Button>
        <IconAlign size={16} direction={currentAlign} />
      </Button>
      {alignments
        .filter((align) => align !== currentAlign)
        .map((align) => (
          <Button
            key={align}
            onClick={() => editor.chain().focus().setTextAlign(align).run()}
            css={{ height: 30 }}
          >
            <IconAlign size={16} direction={align} />
          </Button>
        ))}
    </Dropdown>
  )
}
