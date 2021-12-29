import styled from '@emotion/styled'

export const DragHandle = styled.div({
  width: 10,
  position: 'absolute',
  top: '.5rem',
  left: 3,
  bottom: '.5rem',
  cursor: 'move',
  background:
    'radial-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1) 30%, rgba(0,0,0,0) 31%, rgba(0,0,0,0.0)) left top / 5px 5px repeat',
})
