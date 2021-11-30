import { SyntheticEvent } from 'react'

export function prevent(callback: Function) {
  return (e: SyntheticEvent) => {
    e.preventDefault()
    callback(e)
  }
}
