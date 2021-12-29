import styled from '@emotion/styled'
import { Tabs } from 'src/components/ui'

export const BlocSelectorGrid = styled(Tabs.Tab)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, 218px)',
  gap: '2rem',
  overflow: 'auto',
  maxHeight: 'calc(100vh - 300px)',
  marginTop: '2rem',
  alignContent: 'flex-start',
  height: 700,
  '&::-webkit-scrollbar': {
    width: 7,
    height: 7,
  },
  '&::-webkit-scrollbar-track': {
    background: 'var(--ve-hover)',
    padding: 1,
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'var(--ve-field-border)',
    borderRadius: 4,
  },
  '&[hidden]': {
    display: 'none',
  },
})
