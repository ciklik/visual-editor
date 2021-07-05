import { useEffect, useState } from 'preact/hooks'

export function useAsyncEffect(cb: Function, deps: unknown[]) {
  useEffect(() => {
    cb()
  }, deps)
}
