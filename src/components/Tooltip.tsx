import { usePopper } from 'react-popper'
import { PropRef, useEffect, useState } from 'preact/hooks'
import clsx from 'clsx'
import { ComponentChildren } from 'preact'

type TooltipProps = {
  children: ComponentChildren
  class?: string
  targetRef: PropRef<HTMLElement>
  visible?: boolean
}

export function Tooltip({
  targetRef,
  class: className,
  children,
  visible: isVisibleProp,
}: TooltipProps) {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)
  const [isVisibleState, setIsVisible] = useState(false)
  const { styles, attributes } = usePopper(targetRef.current, popperElement, {
    placement: 'top',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement } },
      { name: 'offset', options: { offset: [0, 15] } },
    ],
  })
  const isVisible = isVisibleProp || isVisibleState

  useEffect(() => {
    if (isVisibleProp !== undefined) {
      return
    }
    const onHover = () => setIsVisible(true)
    const onOut = () => setIsVisible(false)
    const element = targetRef.current
    element.addEventListener('mouseover', onHover)
    element.addEventListener('mouseout', onOut)
    return () => {
      element.removeEventListener('mouseover', onHover)
      element.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div
        ref={setPopperElement}
        style={styles.popper}
        class={clsx(className, 've-tooltip', isVisible && 've-tooltip-visible')}
        {...attributes.popper}
      >
        {children}
        <div
          ref={setArrowElement}
          style={styles.arrow}
          class="ve-tooltip-arrow"
        />
      </div>
    </>
  )
}
