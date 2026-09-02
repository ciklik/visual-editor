import { TiptapToolbarButton as Button } from 'src/components/Editor/TiptapEditor/TiptapToolbarButton'
import { Editor } from '@tiptap/react'
import { useEffect, useMemo } from 'react'
import { colorToProperty } from 'src/functions/css'
import styled from '@emotion/styled'
import { prevent } from 'src/functions/functions'
import { useToggle } from 'src/hooks/useToggle'
import { Styles } from 'src/components/ui'

type Props = {
  editor: Editor
  colors: string[]
}

export function TiptapColorPicker({ editor, colors }: Props) {
  const currentColor = editor?.getAttributes('textStyle').color
  const cssColors = useMemo(
    () => colors.map(colorToProperty),
    [colors]
  ) as string[]
  const [expanded, toggleExpanded, setExpanded] = useToggle()

  // A null color removes the color from the selection
  const handleChange = (color: string | null) => {
    toggleExpanded()
    const chain = editor.chain().focus()
    if (color) {
      chain.setColor(color)
    } else {
      chain.unsetColor()
    }
    chain.run()
  }

  useEffect(() => {
    if (editor.isFocused) {
      setExpanded(false)
    }
  }, [editor.isFocused])

  if (colors.length === 0) {
    return null
  }

  return (
    <div css={{ position: 'relative' }}>
      <Button onClick={prevent(toggleExpanded)} title="Color">
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.246 14H8.754L7.154 18H5L11 3H13L19 18H16.846L15.246 14ZM14.446 12L12 5.885L9.554 12H14.446Z"
            fill="currentColor"
          />
          <path d="M3 20H21V22H3V20Z" fill={currentColor || 'currentColor'} />
        </svg>
      </Button>
      {expanded && <Palette colors={cssColors} onChange={handleChange} />}
    </div>
  )
}

const PaletteWrapper = styled.div<{ size: number }>(
  {
    position: 'absolute',
    top: '100%',
    right: 0,
    background: '#444',
    display: 'grid',
    gridGap: 3,
    padding: 4,
  },
  (props) => ({
    gridTemplateColumns: `repeat(${Math.ceil(props.size / 3)}, 16px)`,
  })
)

const PaletteItem = styled.button({
  width: 16,
  height: 16,
  border: '1px solid transparent',
  cursor: 'pointer',
  '&:hover': {
    borderColor: 'white',
    transform: 'scale(1.5)',
  },
})

/**
 * Checkerboard swatch with a red diagonal, same visual as the Color field
 */
const PaletteItemReset = styled(PaletteItem)({
  ...Styles.Mosaic,
  position: 'relative',
  overflow: 'hidden',
  padding: 0,
  '&::before': {
    position: 'absolute',
    top: -6,
    left: 'calc(50% - 1px)',
    content: "''",
    width: 2,
    height: 28,
    background: 'red',
    transform: 'rotate(45deg)',
  },
})

export function Palette({
  colors,
  onChange,
}: {
  colors: string[]
  onChange: (v: string | null) => void
}) {
  const changeHandler = (color: string | null) => prevent(() => onChange(color))
  return (
    <PaletteWrapper size={colors.length + 1}>
      <PaletteItemReset onClick={changeHandler(null)} title="No color" />
      {colors.map((color) => (
        <PaletteItem
          key={color}
          onClick={changeHandler(color)}
          style={{ backgroundColor: color }}
        />
      ))}
    </PaletteWrapper>
  )
}
