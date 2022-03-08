import styled from '@emotion/styled'

export const Card = styled.div(
  {
    padding: '.8em .6em .8em 1.4em',
    backgroundColor: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
    transition: 'box-shadow .3s!important',
  },
  (props: { hoverable?: boolean }) =>
    props.hoverable
      ? {
          '&:hover': {
            boxShadow: 'var(--ve-shadow-dragging)',
            zIndex: 10,
          },
        }
      : {}
)
