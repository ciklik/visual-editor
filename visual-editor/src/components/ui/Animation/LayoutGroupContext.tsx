import { createContext } from 'react'

export interface LayoutGroupContextProps {
  id?: string
  group?: any
  forceRender?: VoidFunction
}

/**
 * @internal
 */
export const LayoutGroupContext = createContext<LayoutGroupContextProps>({})
