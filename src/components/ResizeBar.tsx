import { useState } from 'preact/hooks'
import { useSetSidebarWidth, useSidebarWidth } from '../store'

export function ResizeBar() {
  const [drag, setDrag] = useState(false)
  const setSidebarWidth = useSetSidebarWidth()
  const sidebarWidth = useSidebarWidth()
  let i = 0
  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setDrag(true)
    const initialX = e.clientX
    const listener = (e: MouseEvent) => {
      setSidebarWidth(e.clientX)
    }
    document.documentElement.addEventListener('mousemove', listener)
    document.documentElement.addEventListener(
      'mouseup',
      (e) => {
        setDrag(false)
        document.documentElement.removeEventListener('mousemove', listener)
      },
      { once: true }
    )
  }

  return (
    <>
      <div class="ve-resizeBar" onMouseDown={handleMouseDown}></div>
      {drag && <div className="ve-resizeBar-overlay"></div>}
    </>
  )
}
