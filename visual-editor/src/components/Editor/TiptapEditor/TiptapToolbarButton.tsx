import styled from '@emotion/styled'
import { UnstyledButton } from 'src/components/ui'

export const TiptapToolbarButton = styled(UnstyledButton)<{ active?: boolean }>(
  {
    height: 40,
    width: 28,
    flex: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      color: '#FFF',
    },
  },
  (props) => ({
    color: props.active ? '#FFF' : '#CCC',
    background: props.active ? 'rgba(255, 255, 255, .1)' : undefined,
  })
)
