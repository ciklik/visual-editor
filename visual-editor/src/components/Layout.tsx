import { Sidebar } from 'src/components/Sidebar/Sidebar'
import { Preview } from 'src/components/Preview/Preview'
import { EditorComponentData } from 'src/types'
import { useSidebarWidth } from 'src/store'
import { ResizeBar } from './ResizeBar'
import { BlocSelector } from './Blocs/BlocSelector'
import React, { FunctionComponent, ReactNode, useState } from 'react'
import { RollbackMessage } from './RollbackMessage'
import { ButtonIcon, IconBack } from 'src/components/ui'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { SidebarToggleButton } from 'src/components/Layout/SidebarToggleButton'
import { useToggle } from 'src/hooks/useToggle'

type LayoutProps = {
  className?: string
  data: EditorComponentData[]
  previewUrl?: string
  onClose: () => void
  iconsUrl: string
  blockPositionOnAdd: string
}

export function Layout({ data, previewUrl, onClose, iconsUrl, blockPositionOnAdd }: LayoutProps) {
  const [sidebarCollapsed, toggleSidebar] = useToggle(false)
  const showResizeControl = !sidebarCollapsed
  return (
    <>
      <Wrapper withSidebar={!sidebarCollapsed}>
        <Sidebar
          data={data}
          onClose={onClose}
          css={{
            display: sidebarCollapsed ? 'none' : undefined,
          }}
        />
        {previewUrl && <Preview data={data} previewUrl={previewUrl} />}
        <SidebarToggleButton
          collapsed={sidebarCollapsed}
          onClick={toggleSidebar}
        />
        {showResizeControl && <ResizeBar />}
        <BlocSelector iconsUrl={iconsUrl} blockPositionOnAdd={blockPositionOnAdd} />
        <RollbackMessage />
      </Wrapper>
    </>
  )
}

function Wrapper(props: { withSidebar: boolean; children: ReactNode }) {
  const sidebarWidth = useSidebarWidth()

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
