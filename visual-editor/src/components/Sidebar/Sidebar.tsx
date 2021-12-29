import { EditorComponentData } from 'src/types'
import { SidebarBlocs } from 'src/components/Sidebar/SidebarBlocs'
import { SidebarHeader } from 'src/components/Sidebar/SidebarHeader'

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

export function Sidebar({
  data,
  onClose,
}: {
  data: EditorComponentData[]
  onClose: () => void
}) {
  return (
    <SidebarWrapper>
      <SidebarHeader onClose={onClose} />
      <SidebarBlocs data={data} />
    </SidebarWrapper>
  )
}

const Out = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-100%)' },
})

const In = keyframes({
  from: { transform: 'translateX(-100%)' },
  to: { transform: 'translateX(0)' },
})

const SidebarWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#FBFBFD',
  zIndex: 2,
  boxShadow:
    '0 20px 25px -5px rgba(0,0,0,0.2),0 10px 10px -5px rgba(0,0,0,0.04)',
  transition: 'transform .5s cubic-bezier(0.19, 1, 0.22, 1)',
  animation: `${In} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
  '[hidden=hidden] &': {
    animation: `${Out} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
  },
})
