import { FunctionComponent } from 'react'
import { IconAlign } from 'src/components/Editor/TiptapEditor/TiptapIcons'
import { Editor } from '@tiptap/core'
import { TiptapToolbarButton as Button } from 'src/components/Editor/TiptapEditor/TiptapToolbarButton'
import styled from '@emotion/styled'

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
            active={editor.isActive({ textAlign: align })}
            css={{ height: 30 }}
          >
            <IconAlign size={16} direction={align} />
          </Button>
        ))}
    </Dropdown>
  )
}

const baseHeight = 40

const Dropdown = styled.div<{ size: number }>(
  {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    background: '#444',
    height: baseHeight,
    flex: 'none',
    overflow: 'hidden',
    alignItems: 'center',
    transition: 'height .2s, transform .3s',
    transformOrigin: '50% 0',
    borderRadius: 3,
    '& > *': {
      height: baseHeight - 10,
    },
    '& > *:first-of-type': {
      marginTop: 0,
      transition: 'margin .3s',
      height: baseHeight,
    },
    '&:hover > *:first-of-type': {
      marginTop: -3,
    },
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  (props) => ({
    '&:hover': {
      height: baseHeight * props.size - 10 * (props.size - 1),
    },
  })
)
