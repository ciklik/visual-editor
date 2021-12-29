import { EditorComponentDefinition } from 'src/types'
import { prevent } from 'src/functions/functions'
import styled from '@emotion/styled'

export function BlocSelectorItem({
  definition,
  name,
  iconsUrl,
  onClick,
}: {
  name: string
  definition: EditorComponentDefinition
  iconsUrl: string
  onClick: () => void
}) {
  const icon = iconsUrl.replace('[name]', name)
  const title = definition.title

  return (
    <Button onClick={prevent(onClick)}>
      <ButtonImage>
        <img src={icon} alt="" />
      </ButtonImage>
      <div>{title}</div>
    </Button>
  )
}

const Button = styled.button({
  backgroundColor: 'transparent',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  font: 'inherit',
  fontWeight: 500,
  cursor: 'pointer',
  transition: '.3s',
  '&:hover, &:focus': {
    outline: 'none',
    color: 'var(--ve-primary)',
    '& img': {
      transform: 'translateY(-5px)',
    },
  },
})

const ButtonImage = styled.div({
  width: '100%',
  backgroundColor: 'var(--ve-hover)',
  height: 107,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  transition: '.3s',
  img: {
    width: 120,
    height: 80,
    objectFit: 'contain',
    borderRadius: 4,
    transition: 'transform .3s',
  },
  '&::after': {
    content: "''",
    position: 'absolute',
    inset: 0,
    opacity: 0,
    background: 'var(--ve-primary)',
    mixBlendMode: 'saturation',
    borderRadius: 4,
    transition: 'opacity .3s',
  },
  [`button:hover &::after, button:focus &::after`]: {
    opacity: 1,
  },
  [`button:focus &`]: {
    transition: 'none',
    border: '2px solid var(--ve-primary)',
  },
})
