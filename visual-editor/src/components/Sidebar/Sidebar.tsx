import { EditorComponentData } from 'src/types'
import { SidebarBlocs } from 'src/components/Sidebar/SidebarBlocs'
import { SidebarHeader } from 'src/components/Sidebar/SidebarHeader'

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { SidebarFooter } from 'src/components/Sidebar/SidebarFooter'
import { SidebarEmpty } from 'src/components/Sidebar/SidebarEmpty'
import { useCallback, useState } from 'react'
import { SidebarTemplates } from 'src/components/Sidebar/SidebarTemplates'
import { useEmit, usePartialStore } from 'src/store'
import { ButtonIcon, IconBlocs, IconPage } from 'src/components/ui'
import { prevent } from 'src/functions/functions'
import { t } from 'src/functions/i18n'
import { Events } from 'src/constants'

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
  const { templates } = usePartialStore('templates')
  const emit = useEmit()
  const toggleMode = useCallback(() => {
    setState((v) => {
      if (v === States.BLOCS) {
        const event = emit(Events.Templates, { cancelable: true })
        if (event.defaultPrevented) {
          return v
        }
      }
      return v === States.BLOCS ? States.TEMPLATES : States.BLOCS
    })
  }, [])
  const hasTemplates = templates.length > 0
  const showEmpty = data.length === 0 && hasTemplates
  const isTemplateMode = state === States.TEMPLATES

  return (
    <SidebarWrapper {...props}>
      <SidebarHeader onClose={onClose}>
        {hasTemplates && (
          <ButtonIcon
            onClick={prevent(toggleMode)}
            title={t(isTemplateMode ? 'addComponent' : 'useTemplate')}
          >
            {isTemplateMode ? <IconBlocs /> : <IconPage />}
          </ButtonIcon>
        )}
      </SidebarHeader>
      {state === States.BLOCS &&
        (showEmpty ? (
          <SidebarEmpty onAction={() => setState(States.TEMPLATES)} />
        ) : (
          <SidebarBlocs data={data} />
        ))}
      {state === States.TEMPLATES && (
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
