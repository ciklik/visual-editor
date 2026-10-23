import { FunctionComponent } from 'react'
import { IconAlign } from './TiptapIcons'
import { Editor } from '@tiptap/core'
import { TiptapToolbarButton as Button } from './TiptapToolbarButton'
import { TiptapDropdown as Dropdown } from './TiptapDropdown'
import { prevent } from 'src/functions/functions'
import { alignmentLabel } from 'src/functions/i18n'

export const TiptapToolbarAlign: FunctionComponent<{ editor: Editor }> = ({
  editor,
}) => {
  const alignments = ['left', 'center', 'right', 'justify'] as const
  const currentAlign =
    alignments.find((align) => editor.isActive({ textAlign: align })) ?? 'left'

  if (!editor.can().setTextAlign('left')) {
    return null
  }

  return (
    <Dropdown size={alignments.length}>
      <Button title={alignmentLabel(currentAlign)} type="button">
        <IconAlign size={16} direction={currentAlign} />
      </Button>
      {alignments
        .filter((align) => align !== currentAlign)
        .map((align) => (
          <Button
            key={align}
            onClick={prevent(() =>
              editor.chain().focus().setTextAlign(align).run()
            )}
            css={{ height: 30 }}
            title={alignmentLabel(align)}
          >
            <IconAlign size={16} direction={align} />
          </Button>
        ))}
    </Dropdown>
  )
}
