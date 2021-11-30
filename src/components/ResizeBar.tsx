import React, { SyntheticEvent, useState } from 'react'
import { useSetSidebarWidth } from 'src/store'
import cx from 'clsx'

export function ResizeBar () {
  const [drag, setDrag] = useState(false)
  const setSidebarWidth = useSetSidebarWidth()
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
      { once: true },
    )
  }

  return (
    <>
      <div
        className={cx('ve-resizeBar', drag && 'is-active')}
        onMouseDown={handleMouseDown}
      />
      {drag && <div className='ve-resizeBar-overlay' />}
    </>
  )
}
