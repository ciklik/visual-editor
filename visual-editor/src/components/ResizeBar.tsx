import React, { SyntheticEvent, useState } from 'react'
import { useSetSidebarWidth } from 'src/store'
import cx from 'clsx'

import Styles from './ResizeBar.module.scss'

export function ResizeBar() {
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
      { once: true }
    )
  }

  return (
    <>
      <div
        className={cx(Styles.ResizeBar, drag && Styles.ResizeBarActive)}
        onMouseDown={handleMouseDown}
      />
      {drag && <div className={Styles.ResizeBarOverlay} />}
    </>
  )
}
