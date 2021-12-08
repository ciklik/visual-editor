import clsx from 'clsx'
import { Sidebar } from 'src/components/Sidebar/Sidebar'
import { Preview } from 'src/components/Preview'
import { EditorComponentData } from 'src/types'
import { useSidebarWidth } from 'src/store'
import { ResizeBar } from './ResizeBar'
import { BlocSelector } from './Blocs/BlocSelector'
import React, { ReactElement, ReactNode } from 'react'
import Styles from './Layout.module.scss'

type LayoutProps = {
  className?: string
  data: EditorComponentData[]
  previewUrl?: string
  onClose: () => void
  iconsUrl: string
}

export function Layout({ data, previewUrl, onClose, iconsUrl }: LayoutProps) {
  return (
    <Wrapper>
      <div className={Styles.Layout}>
        <Sidebar data={data} onClose={onClose} />
        {previewUrl && (
          <Preview data={data} previewUrl={previewUrl} iconsUrl={iconsUrl} />
        )}
      </div>
      <ResizeBar />
      <BlocSelector />
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
