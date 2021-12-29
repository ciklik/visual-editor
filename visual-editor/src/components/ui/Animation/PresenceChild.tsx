import * as React from 'react'
import { useMemo } from 'react'
import { useConstant } from './hooks'
import cx from 'clsx'
import type { Keyframes } from '@emotion/react'
import { ClassNames } from '@emotion/react'

interface PresenceChildProps {
  children: React.ReactElement<any>
  isPresent: boolean
  onExitComplete?: () => void
  in: Keyframes
  out: Keyframes
}

const Base = {
  animationDuration: '.7s',
  animationTimingFunction: 'cubic-bezier(0.19, 1, 0.22, 1)',
  animateFill: 'both',
}

export const PresenceChild = ({
  children,
  isPresent,
  onExitComplete,
  in: inKeyframes,
  out: outKeyframes,
}: PresenceChildProps) => {
  const presenceChildren = useConstant(newChildrenMap)
  const animationName = isPresent ? inKeyframes : outKeyframes

  useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false))
  }, [isPresent])

  return (
    <ClassNames>
      {({ css, cx }) =>
        React.cloneElement(children, {
          className: cx(
            children.props.className,
            css({
              ...Base,
              animationName: animationName.toString(),
            })
          ),
          onAnimationEnd: isPresent ? null : onExitComplete,
        })
      }
    </ClassNames>
  )
}

function newChildrenMap(): Map<number, boolean> {
  return new Map()
}
