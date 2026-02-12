import styled from '@emotion/styled'

const baseHeight = 40

export const TiptapDropdown = styled.div<{ size: number }>(
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
    zIndex: 1000,
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
