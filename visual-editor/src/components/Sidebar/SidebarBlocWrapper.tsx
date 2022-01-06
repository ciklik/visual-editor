import styled from '@emotion/styled'
import { Sortable } from 'src/components/Sortable'

export const SidebarBlocWrapper = styled(Sortable, {
  target: 'SidebarBlocWrapper',
})({
  position: 'relative',
  padding: '.8em .6em .8em 1.4em',
  backgroundColor: '#fff',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
  transition: 'box-shadow .3s',
  cursor: 'inherit', // Avoir problems with reset that set pointer on [role=button]
  '&[data-dragging]': {
    boxShadow: 'var(--ve-shadow-dragging)',
    transition: 'box-shadow .3s!important',
    zIndex: 10,
  },
})
