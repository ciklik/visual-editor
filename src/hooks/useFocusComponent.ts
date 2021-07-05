import { ComponentChildren, ComponentType, createContext, h } from 'preact'
import { useContext, useState } from 'preact/hooks'

type ContextValue = {
  index: string | null
  setIndex: (index: string | null) => void
}

const FocusContext = createContext<ContextValue>({
  index: null,
  setIndex: () => {},
})

export function FocusContextProvider({
  children,
}: {
  children: ComponentChildren
}) {
  const [index, setIndex] = useState<string | null>(null)
  return h(
    FocusContext.Provider as ComponentType<any>,
    { value: { index, setIndex } },
    children
  )
}

export function useFocusComponent(): [
  ContextValue['index'],
  ContextValue['setIndex']
] {
  const { index, setIndex } = useContext(FocusContext)
  return [index, setIndex]
}
