import { create, useStore as useZustandStore } from 'zustand'
import {
  Action,
  Device,
  EditorComponentData,
  EditorComponentDefinitions,
  EditorComponentTemplate,
} from 'src/types'
import { deepSet, indexify } from 'src/functions/object'
import { combine } from 'zustand/middleware'
import { insertItem, moveItem } from 'src/functions/array'
import { uniqId } from 'src/functions/string'

import { clamp } from './functions/number'
import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { fillDefaults } from './functions/fields'
import { t } from 'src/functions/i18n'
import { InsertPosition } from 'src/enum'
import { Events } from 'src/constants'

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
  insertPosition: InsertPosition,
  devices: Device[],
  actions: Action[]
) => {
  return create(
    combine(
      {
        data,
        definitions,
        hiddenCategories,
        rootElement,
        templates,
        insertPosition,
        actions,
        device: devices[devices.length - 1]!,
        devices: devices,
        previousData: data,
        rollbackMessage: null as null | string,
        // index where we will add a new block
        addBlockIndex: null as null | number,
        // Focused block (used for the preview)
        focusIndex: null as null | string,
        sidebarMode: 'components',
        sidebarWidth: clamp(
          sidebarWidth ? parseInt(sidebarWidth, 10) : 33,
          0,
          window.innerWidth - 375
        ),
      },
      (set, getState) => {
        const methods = {
          setDevice: function (device: Device) {
            set({ device })
          },
          setSidebarWidth: function (width: number) {
            localStorage.setItem('veSidebarWidth', width.toString())
            set({
              sidebarWidth: width,
            })
          },
          updateData: function (newData: any, path?: string) {
            set((state) => ({
              data: deepSet(state.data, path, newData),
            }))
            methods.dispatchEvent(Events.Change)
          },
          moveBloc: function (id: string, direction: number) {
            return set(({ data }) => {
              const currentIndex = data.findIndex((d) => d._id === id)
              return {
                data: moveItem(data, currentIndex, currentIndex + direction),
              }
            })
          },
          removeBloc: function (id: string) {
            set(({ data }) => ({
              previousData: data,
              data: data.filter((d) => d._id !== id),
              rollbackMessage: t('deleteItemConfirm'),
            }))
            return methods.dispatchEvent(Events.Change)
          },
          rollback: function () {
            set(({ previousData }) => ({
              previousData: [],
              rollbackMessage: null,
              data: previousData,
            }))
            methods.dispatchEvent(Events.Change)
          },
          voidRollback: function () {
            return set({
              rollbackMessage: null,
              previousData: [],
            })
          },
          insertData: function (
            name: string,
            index: number,
            extraData?: object
          ) {
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
            methods.dispatchEvent(Events.Change)
            return newData
          },
          dispatchEvent(e: Events) {
            const state = getState()
            state.rootElement.dispatchEvent(new CustomEvent(e))
          },
          setData: function (
            newData: Omit<EditorComponentData, '_id'>[]
          ): void {
            set({
              data: indexify(newData) as EditorComponentData[],
              focusIndex: null,
            })
            methods.dispatchEvent(Events.Change)
          },
          setDataFromOutside: function (
            newData: Omit<EditorComponentData, '_id'>[]
          ) {
            set({
              data: indexify(newData) as EditorComponentData[],
            })
          },
          setFocusIndex: function (id: string) {
            set({ focusIndex: id })
          },
          setAddBlockIndex: function (index?: number | string | null) {
            const state = getState()
            if (index === undefined) {
              methods.setAddBlockIndex(
                state.insertPosition === InsertPosition.Start
                  ? 0
                  : state.data.length
              )
              return
            }
            if (typeof index === 'string') {
              methods.setAddBlockIndex(
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
                    methods.insertData(name, index, extraData)
                    methods.setAddBlockIndex(null)
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
          toggleSidebarMode: function () {
            set(({ sidebarMode }) => ({
              sidebarMode:
                sidebarMode === 'components' ? 'templates' : 'components',
            }))
          },
        }
        return methods
      }
    )
  )
}

export type Store = ReturnType<typeof createStore>
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
  devices,
  onStore,
  actions,
}: {
  children: ReactElement
  data: EditorComponentData[]
  templates: EditorComponentTemplate[]
  definitions: EditorComponentDefinitions
  hiddenCategories: string[]
  rootElement: HTMLElement
  insertPosition: InsertPosition
  devices: Device[]
  actions: Action[]
  onStore: (s: Store) => void
}) {
  const store = useMemo(
    () =>
      createStore(
        data,
        definitions,
        hiddenCategories,
        rootElement,
        templates,
        insertPosition,
        devices,
        actions
      ),
    [
      data,
      definitions,
      hiddenCategories,
      rootElement,
      templates,
      insertPosition,
      devices,
    ]
  )
  onStore(store)
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

export function usePartialStore<K extends keyof StoreState>(...keys: K[]) {
  return Object.fromEntries(
    keys.map((k) => [k, useStore((state) => state[k])])
  ) as Pick<StoreState, K>
}

export function useFieldFocused(id: string) {
  return useStore((state) => state.focusIndex === id)
}

export function useBlocSelectionVisible(): boolean {
  return useStore((state) => state.addBlockIndex) !== null
}

export function useEmit() {
  const { rootElement } = usePartialStore('rootElement')
  return (eventName: Events, args?: CustomEventInit) => {
    const event = new CustomEvent(eventName, args)
    rootElement.dispatchEvent(event)
    return event
  }
}

/**
 * Add a new block at the current selected index
 */
export function useAddBlock() {
  const { insertData, definitions, setAddBlockIndex } = usePartialStore(
    'insertData',
    'definitions',
    'setAddBlockIndex'
  )
  const blockIndex = useStore((state) => state.addBlockIndex) || 0

  return useCallback(
    (blocName: string) => {
      insertData(blocName, blockIndex)
      setAddBlockIndex(null)
    },
    [insertData, blockIndex, definitions, setAddBlockIndex]
  )
}

export function useRollbackMessage() {
  const message = useStore((state) => state.rollbackMessage)
  const rollback = useStore((state) => state.rollback)
  const voidRollback = useStore((state) => state.voidRollback)
  return { message, rollback, voidRollback }
}

export function useGetData(): () => EditorComponentData[] {
  const context = useContext(StoreContext)
  return () => context.store?.getState().data ?? []
}

export function useDataLength(): number {
  return useStore((state) => state.data.length)
}

export const store = useStore
