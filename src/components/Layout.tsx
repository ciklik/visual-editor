import clsx from 'clsx'
import { Sidebar } from 'src/components/Sidebar/Sidebar'
import { Preview } from 'src/components/Preview'
import { EditorComponentData } from 'src/types'
import { useSidebarWidth } from 'src/store'
import { ResizeBar } from './ResizeBar'
import { ComponentChildren } from 'preact'
import { BlocSelector } from './Blocs/BlocSelector'

type LayoutProps = {
  class?: string
  data: EditorComponentData[]
  previewUrl?: string
  onClose: () => void
  iconsUrl: string
}

export function Layout({
  class: className,
  data,
  previewUrl,
  onClose,
  iconsUrl,
}: LayoutProps) {

  return (
    <Wrapper>
      <div class={clsx('ve-layout', className)}>
        <Sidebar data={data} onClose={onClose} />
        {previewUrl && (
          <Preview data={data} previewUrl={previewUrl} iconsUrl={iconsUrl} />
        )}
      </div>
      <ResizeBar />
      <BlocSelector/>
    </Wrapper>
  )
}

function Wrapper({ children }: { children: ComponentChildren }) {
  const sidebarWidth = useSidebarWidth()

  return (
    <div class="ve-wrapper" style={{ '--ve-sidebar': `${sidebarWidth}vw` }}>
      {children}
    </div>
  )
}
