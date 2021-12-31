import { FunctionComponent } from 'react'
import { IconHeading } from './TiptapIcons'
import { Editor } from '@tiptap/core'
import { TiptapToolbarButton as Button } from './TiptapToolbarButton'
import { TiptapDropdown as Dropdown } from './TiptapDropdown'
import { prevent } from 'src/functions/functions'

type Level = 1 | 2 | 3 | 4 | 5 | 6

export const TiptapToolbarHeadings: FunctionComponent<{ editor: Editor }> = ({
  editor,
}) => {
  const levels = [2, 3, 4, 5, 6] as const
  const currentLevel = editor.getAttributes('heading').level

  if (!editor.can().toggleHeading({ level: 2 })) {
    return null
  }

  const clickHandler = (level?: Level) =>
    prevent(() => {
      if (!level) {
        return
      }
      editor.chain().focus().toggleHeading({ level }).run()
    })

  return (
    <Dropdown size={levels.length + 1}>
      <Button active={!!currentLevel} onClick={clickHandler(currentLevel)}>
        <IconHeading size={16} level={currentLevel} />
      </Button>
      {levels.map((level) => (
        <Button
          key={level}
          active={level === currentLevel}
          onClick={clickHandler(level)}
          css={{ height: 30 }}
        >
          <IconHeading size={16} level={level} />
        </Button>
      ))}
    </Dropdown>
  )
}
