import { Sidebar } from 'src/components/Sidebar/Sidebar'
import { Preview } from 'src/components/Preview/Preview'
import { type EditorComponentData } from 'src/types'
import { ResizeBar } from './ResizeBar'
import { BlocSelector } from './Blocs/BlocSelector'
import React, { ReactNode } from 'react'
import { RollbackMessage } from './RollbackMessage'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { SidebarToggleButton } from 'src/components/Layout/SidebarToggleButton'
import { useToggle } from 'src/hooks/useToggle'
import { VisualEditor } from 'src/VisualEditor'
import { PreviewPostMessage } from 'src/components/Preview/PreviewPostMessage'
import { Header } from 'src/components/Header/Header'
import { usePartialStore } from 'src/store'

type LayoutProps = {
  className?: string
  data: EditorComponentData[]
  previewUrl?: string
  onClose: () => void
  iconsUrl: string
}

export function Layout({ data, previewUrl, onClose, iconsUrl }: LayoutProps) {
  const [sidebarCollapsed, toggleSidebar] = useToggle(false)
  const showResizeControl = !sidebarCollapsed
  const PreviewComponent = VisualEditor.postMessagePreview
    ? PreviewPostMessage
    : Preview
  return (
    <>
      <Wrapper withSidebar={!sidebarCollapsed}>
        <Header />
        <Sidebar
          data={data}
          onClose={onClose}
          css={{
            display: sidebarCollapsed ? 'none' : undefined,
          }}
        />
        {previewUrl && <PreviewComponent data={data} previewUrl={previewUrl} />}
        <SidebarToggleButton
          collapsed={sidebarCollapsed}
          onClick={toggleSidebar}
        />
        {showResizeControl && <ResizeBar />}
        <BlocSelector iconsUrl={iconsUrl} />
        <RollbackMessage />
      </Wrapper>
    </>
  )
}

function Wrapper(props: { withSidebar: boolean; children: ReactNode }) {
  const { sidebarWidth } = usePartialStore('sidebarWidth')

  return (
    <StyledWrapper
      {...props}
      style={{ '--ve-sidebar': `${sidebarWidth}vw` } as React.CSSProperties}
    />
  )
}

const In = keyframes({
  from: { backgroundColor: 'rgba(255, 255, 255, 0)' },
  to: { backgroundColor: 'var(--ve-field-border)' },
})

const Out = keyframes({
  from: { backgroundColor: 'var(--ve-field-border)' },
  to: { backgroundColor: 'rgba(255, 255, 255, 0)' },
})

const StyledWrapper = styled.div<{ withSidebar: boolean }>(
  {
    isolation: 'isolate',
    zIndex: 9999,
    fontSize: '15px',
    '--ve-sidebar': '600px',
    '--ve-clampedSidebar':
      'clamp(450px, var(--ve-sidebar), calc(100vw - 375px))',
    color: 'var(--ve-color-light)',
    transition: 'background-color .3s',
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    display: 'grid',
    backgroundColor: 'var(--ve-field-border)',
    animation: `${In} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
    '[hidden="hidden"] &': {
      animation: `${Out} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
    },
    '& *': {
      '&::-webkit-scrollbar': { width: '7px', height: '7px' },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
        padding: '1px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'var(--ve-field-border)',
        borderRadius: '4px',
      },
    },
  },
  (props) => ({
    gridTemplateColumns: props.withSidebar
      ? 'var(--ve-clampedSidebar) 1fr'
      : '1fr',
  })
)
