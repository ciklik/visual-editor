import { create, useStore as useZustandStore } from 'zustand'
import {
  EditorComponentData,
  EditorComponentDefinitions,
  EditorComponentTemplate,
} from 'src/types'
import { deepSet, indexify } from 'src/functions/object'
import { combine, devtools } from 'zustand/middleware'
import { insertItem } from 'src/functions/array'
import { uniqId } from 'src/functions/string'

import { clamp } from './functions/number'
import React, {
  ReactElement,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react'
import { fillDefaults } from './functions/fields'
import { t } from 'src/functions/i18n'
import { InsertPosition } from 'src/enum'
import { Events } from 'src/constants'

export enum PreviewModes {
  PHONE,
  DESKTOP,
}

type State = {
  data: EditorComponentData[]
  templates: EditorComponentTemplate[]
  previousData: EditorComponentData[]
  definitions: EditorComponentDefinitions
  hiddenCategories: string[]
  focusIndex: null | string
  rollbackMessage: null | string
  previewMode: PreviewModes
  sidebarWidth: number
  // Index where we want to add the next component
  addBlockIndex: number | null
  rootElement: HTMLElement
  insertPosition: InsertPosition
  setSidebarWidth: (width: number) => void
  updateData: (newData: any, path?: string) => void
  removeBloc: (data: EditorComponentData) => void
  rollback: () => void
  voidRollback: () => void
  insertData: (name: string, index: number, extraData?: object) => void
  setData: (data: Omit<EditorComponentData, '_id'>[]) => void
  setFocusIndex: (id: string) => void
  setAddBlockIndex: (index?: number | string | null) => void
  togglePreviewMode: () => void
}

const sidebarWidth =
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('veSidebarWidth')
    : 0

const createStore = (
  data: EditorComponentData[] = [],
  definitions: EditorComponentDefinitions,
  hiddenCategories: string[] = [],
  rootElement: HTMLElement,
  templates: EditorComponentTemplate[],
  insertPosition: InsertPosition
) =>
  create<State>()((set, getState) => ({
    data,
    definitions,
    hiddenCategories,
    rootElement,
    templates,
    insertPosition,
    previousData: [],
    rollbackMessage: null,
    // index where we will add a new block
    addBlockIndex: null,
    // Focused block (used for the preview)
    focusIndex: null,
    previewMode: PreviewModes.DESKTOP,
    sidebarWidth: clamp(
      sidebarWidth ? parseInt(sidebarWidth, 10) : 33,
      0,
      window.innerWidth - 375
    ),
    setSidebarWidth: function (width: number) {
      localStorage.setItem('veSidebarWidth', width.toString())
      set(() => ({
        sidebarWidth: width,
      }))
    },
    updateData: function (newData: any, path?: string) {
      return set((state) => ({
        data: deepSet(state.data, path, newData),
      }))
    },
    removeBloc: function (removedData: EditorComponentData) {
      return set(({ data }) => ({
        previousData: data,
        data: data.filter((d) => d !== removedData),
        rollbackMessage: t('deleteItemConfirm'),
      }))
    },
    rollback: function () {
      return set(({ previousData }) => ({
        previousData: [],
        rollbackMessage: null,
        data: previousData,
      }))
    },
    voidRollback: function () {
      return set(() => ({
        rollbackMessage: null,
        previousData: [],
      }))
    },
    insertData: function (
      name: string,
      index: number,
      extraData?: object
    ): EditorComponentData {
      if (!extraData) {
        extraData = fillDefaults({}, getState().definitions[name]!.fields)
      }
      const newData = indexify({
        ...extraData,
        _name: name,
        _id: name + uniqId(),
      })
      set((state) => {
        return {
          data: insertItem(state.data, index, newData),
          focusIndex: newData._id,
        }
      })
      return newData
    },
    setData: function (newData: Omit<EditorComponentData, '_id'>[]): void {
      set(() => {
        return {
          data: indexify(newData) as EditorComponentData[],
          focusIndex: null,
        }
      })
    },
    setFocusIndex: function (id: string) {
      set(() => ({ focusIndex: id }))
    },
    setAddBlockIndex: function (index?: number | string | null) {
      const state = getState()
      if (index === undefined) {
        state.setAddBlockIndex(
          state.insertPosition === InsertPosition.Start ? 0 : state.data.length
        )
        return
      }
      if (typeof index === 'string') {
        state.setAddBlockIndex(
          state.data.findIndex((v) => v._id === index) ?? 0
        )
        return
      }
      if (index !== null) {
        const event = new CustomEvent(Events.Components, {
          cancelable: true,
          detail: {
            index: index,
            add: (name: string, extraData?: object) => {
              state.insertData(name, index, extraData)
              state.setAddBlockIndex(null)
            },
          },
        })
        state.rootElement.dispatchEvent(event)
        if (event.defaultPrevented) {
          return
        }
      }
      set({ addBlockIndex: index })
    },
    togglePreviewMode: function () {
      set(({ previewMode }) => ({
        previewMode:
          previewMode === PreviewModes.DESKTOP
            ? PreviewModes.PHONE
            : PreviewModes.DESKTOP,
      }))
    },
  }))

type Store = ReturnType<typeof createStore>
// Extrait le type de la donnée à l'intérieur d'un UseBoundStore<T>
type StoreState = Store extends {
  getState: () => infer T
}
  ? T
  : never

const StoreContext = createContext<{ store?: Store }>({})

export function StoreProvider({
  children,
  data,
  definitions,
  hiddenCategories,
  rootElement,
  templates,
  insertPosition,
}: {
  children: ReactElement
  data: EditorComponentData[]
  templates: EditorComponentTemplate[]
  definitions: EditorComponentDefinitions
  hiddenCategories: string[]
  rootElement: HTMLElement
  insertPosition: InsertPosition
}) {
  const store = useMemo(
    () =>
      createStore(
        data,
        definitions,
        hiddenCategories,
        rootElement,
        templates,
        insertPosition
      ),
    [
      data,
      definitions,
      hiddenCategories,
      rootElement,
      templates,
      insertPosition,
    ]
  )
  return (
    <StoreContext.Provider value={{ store: store }}>
      {children}
    </StoreContext.Provider>
  )
}

function useStore<T>(selector: (state: StoreState) => T) {
  const store = useContext(StoreContext).store
  if (!store) {
    throw new Error('A context need to be provided to use the store')
  }
  return useZustandStore(store, selector)
}

export function useData() {
  return useStore((state) => state.data)
}

export function useRootElement() {
  return useStore((state) => state.rootElement)
}

export function useUpdateData() {
  return useStore((state) => state.updateData)
}

export function useRemoveBloc() {
  return useStore((state) => state.removeBloc)
}

export function useInsertData() {
  return useStore((state) => state.insertData)
}

export function useSetData() {
  return useStore((state) => state.setData)
}

export function useFocusIndex() {
  return useStore((state) => state.focusIndex)
}

export function useDefinitions() {
  return useStore((state) => state.definitions)
}

export function useSetFocusIndex() {
  return useStore((state) => state.setFocusIndex)
}

export function useFieldFocused(id: string) {
  return useStore((state) => state.focusIndex === id)
}

export function usePreviewMode() {
  return useStore((state) => state.previewMode)
}

export function useTogglePreviewMode() {
  return useStore((state) => state.togglePreviewMode)
}

export function useSidebarWidth() {
  return useStore((state) => state.sidebarWidth)
}

export function useSetSidebarWidth() {
  return useStore((state) => state.setSidebarWidth)
}

export function useFieldDefinitions() {
  return useStore((state) => state.definitions)
}

export function useHiddenCategories() {
  return useStore((state) => state.hiddenCategories)
}

export function useBlocSelectionVisible(): boolean {
  return useStore((state) => state.addBlockIndex) !== null
}

export function useSetBlockIndex() {
  return useStore((state) => state.setAddBlockIndex)
}

export function useTemplates() {
  return useStore((state) => state.templates)
}

export function useEmit() {
  const element = useRootElement()
  return (eventName: Events, args?: CustomEventInit) => {
    const event = new CustomEvent(eventName, args)
    element.dispatchEvent(event)
    return event
  }
}

/**
 * Add a new block at the current selected index
 */
export function useAddBlock() {
  const insertData = useInsertData()
  const blockIndex = useStore((state) => state.addBlockIndex) || 0

  const definitions = useDefinitions()
  const setBlockIndex = useSetBlockIndex()
  return useCallback(
    (blocName: string) => {
      insertData(blocName, blockIndex)
      setBlockIndex(null)
    },
    [insertData, blockIndex, definitions, setBlockIndex]
  )
}

export function useRollbackMessage() {
  const message = useStore((state) => state.rollbackMessage)
  const rollback = useStore((state) => state.rollback)
  const voidRollback = useStore((state) => state.voidRollback)
  return { message, rollback, voidRollback }
}

export const store = useStore
