import { EditorComponentData } from 'src/types'
import { SidebarBlocs } from 'src/components/Sidebar/SidebarBlocs'
import { SidebarHeader } from 'src/components/Sidebar/SidebarHeader'

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { SidebarFooter } from 'src/components/Sidebar/SidebarFooter'
import { SidebarEmpty } from 'src/components/Sidebar/SidebarEmpty'
import { useState } from 'react'
import { SidebarTemplates } from 'src/components/Sidebar/SidebarTemplates'

enum States {
  BLOCS,
  TEMPLATES,
}

export function Sidebar({
  data,
  onClose,
  ...props
}: {
  data: EditorComponentData[]
  onClose: () => void
}) {
  const [state, setState] = useState(States.BLOCS)
  return (
    <SidebarWrapper {...props}>
      <SidebarHeader onClose={onClose} />
      {data.length > 0 && <SidebarBlocs data={data} />}
      {state === States.BLOCS && data.length === 0 && (
        <SidebarEmpty onAction={() => setState(States.TEMPLATES)} />
      )}
      {state === States.TEMPLATES && data.length === 0 && (
        <SidebarTemplates onTemplate={() => setState(States.BLOCS)} />
      )}
      <SidebarFooter />
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
