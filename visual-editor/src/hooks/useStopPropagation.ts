import { RefObject, useEffect } from 'react'

type EventNames = keyof HTMLElementEventMap

const stopPropagation = (e: Event) => e.stopPropagation()

export function useStopPropagation(
  ref: RefObject<HTMLElement>,
  eventNames: EventNames[]
) {
  useEffect(() => {
    if (!ref.current) {
      return
    }
    eventNames.map((eventName) => {
      ref.current!.addEventListener(eventName, stopPropagation)
    })
    return () => {
      if (!ref.current) {
        return
      }
      eventNames.map((eventName) => {
        ref.current!.removeEventListener(eventName, stopPropagation)
      })
    }
  })
}
