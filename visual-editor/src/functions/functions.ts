import { SyntheticEvent } from 'react'

export function prevent(callback?: Function) {
  if (!callback) {
    return
  }
  return (e: SyntheticEvent) => {
    e.preventDefault()
    callback(e)
  }
}

export function preventPropagation(callback?: Function) {
  if (!callback) {
    return
  }
  return (e: SyntheticEvent) => {
    e.preventDefault()
    e.stopPropagation()
    callback(e)
  }
}
