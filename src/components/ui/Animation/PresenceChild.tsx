import * as React from 'react'
import { useMemo } from 'react'
import { useConstant } from './hooks'
import cx from 'clsx'

interface PresenceChildProps {
  children: React.ReactElement<any>
  isPresent: boolean
  onExitComplete?: () => void
  in: string
  out: string
}

let presenceId = 0
function getPresenceId() {
  const id = presenceId
  presenceId++
  return id
}

export const PresenceChild = ({
  children,
  isPresent,
  onExitComplete,
  in: inClass,
  out: outclass,
}: PresenceChildProps) => {
  const presenceChildren = useConstant(newChildrenMap)

  useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false))
  }, [isPresent])

  return React.cloneElement(children, {
    className: cx(children.props.className, isPresent ? inClass : outclass),
    onAnimationEnd: isPresent ? null : onExitComplete,
  })
}

function newChildrenMap(): Map<number, boolean> {
  return new Map()
}
