import { SyntheticEvent, useState } from 'react'

import styled from '@emotion/styled'
import { usePartialStore } from 'src/store'

export function ResizeBar() {
  const [drag, setDrag] = useState(false)
  const { setSidebarWidth } = usePartialStore('setSidebarWidth')
  const handleMouseDown = (e: SyntheticEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setDrag(true)
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
      <Wrapper isDragging={drag} onMouseDown={handleMouseDown} />
      {drag && <ResizeBarOverlay />}
    </>
  )
}

const Wrapper = styled.div<{ isDragging: boolean }>(
  {
    position: 'fixed',
    top: 0,
    bottom: 0,
    height: '100%',
    left: 'var(--ve-clampedSidebar)',
    width: 15,
    zIndex: 1002,
    cursor: 'ew-resize',
    transition: 'box-shadow .3s',
    ':hover': {
      boxShadow: '-1px -1px 0 1px var(--ve-primary)',
    },
  },
  ({ isDragging }) =>
    isDragging
      ? {
          boxShadow: '-1px -1px 0 1px var(--ve-primary)',
        }
      : null
)

const ResizeBarOverlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1001,
})
