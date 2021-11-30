import { useRef } from 'react'

export function useDebugProp(prop: any, name: string) {
  const ref = useRef(prop)
  if (prop !== ref.current) {
    ref.current = prop
    console.log(`La propriété ${name} a changée`)
  }
}
