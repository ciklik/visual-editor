import { useEffect, useState } from 'react'

export function useAsyncEffect(cb: Function, deps: unknown[]) {
  useEffect(() => {
    cb()
  }, deps)
}
