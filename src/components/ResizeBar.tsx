import { useState } from 'preact/hooks'
import { useSetSidebarWidth, useSidebarWidth } from '../store'
import cx from 'clsx'
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
      setSidebarWidth(Math.round((100 * e.clientX) / window.innerWidth))
    }
    document.documentElement.addEventListener('mousemove', listener)
    document.documentElement.addEventListener(
      'mouseup',
      () => {
        setDrag(false)
        document.documentElement.removeEventListener('mousemove', listener)
      },
      { once: true }
    )
  }

  return (
    <>
      <div
        class={cx('ve-resizeBar', drag && 'is-active')}
        onMouseDown={handleMouseDown}
      ></div>
      {drag && <div className="ve-resizeBar-overlay"></div>}
    </>
  )
}
