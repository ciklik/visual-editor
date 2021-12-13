import { Sidebar } from 'src/components/Sidebar/Sidebar'
import { Preview } from 'src/components/Preview'
import { EditorComponentData } from 'src/types'
import { useSidebarWidth } from 'src/store'
import { ResizeBar } from './ResizeBar'
import { BlocSelector } from './Blocs/BlocSelector'
import React, { ReactNode, useState } from 'react'
import Styles from './Layout.module.scss'
import { RollbackMessage } from './RollbackMessage'
import cx from 'clsx'
import { ButtonIcon } from './ui/ButtonIcon'
import { prevent } from '../functions/functions'
import { IconBack } from './ui/Icons'

type LayoutProps = {
  className?: string
  data: EditorComponentData[]
  previewUrl?: string
  onClose: () => void
  iconsUrl: string
}

export function Layout({ data, previewUrl, onClose, iconsUrl }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const showResizeControl = !sidebarCollapsed
  return (
    <Wrapper>
      <div
        className={cx(
          Styles.Layout,
          sidebarCollapsed && Styles.LayoutSidebarCollapsed
        )}
      >
        <Sidebar data={data} onClose={onClose} />
        {previewUrl && (
          <Preview data={data} previewUrl={previewUrl} iconsUrl={iconsUrl} />
        )}
      </div>
      <ButtonIcon
        onClick={prevent(() => setSidebarCollapsed((v) => !v))}
        className={Styles.LayoutCollapseButton}
      >
        <IconBack size={20} />
      </ButtonIcon>
      {showResizeControl && <ResizeBar />}
      <BlocSelector iconsUrl={iconsUrl} />
      <RollbackMessage />
    </Wrapper>
  )
}

function Wrapper({ children }: { children: ReactNode }) {
  const sidebarWidth = useSidebarWidth()

  return (
    <div
      className={Styles.LayoutWrapper}
      style={{ '--ve-sidebar': `${sidebarWidth}vw` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}
