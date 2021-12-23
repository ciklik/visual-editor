import create, { UseBoundStore } from 'zustand'
import { EditorComponentData, EditorComponentDefinitions } from 'src/types'
import { deepSet } from 'src/functions/object'
import { combine, devtools } from 'zustand/middleware'
import { insertItem } from 'src/functions/array'
import { uniqId } from 'src/functions/string'

import createContext from 'zustand/context'
import { clamp } from './functions/number'
import React, { ReactElement, useCallback } from 'react'
import { fillDefaults } from './functions/fields'

export enum PreviewModes {
  PHONE,
  DESKTOP,
}

type State = {
  data: EditorComponentData[]
  previousData: EditorComponentData[]
  definitions: EditorComponentDefinitions
  hiddenCategories: string[]
  focusIndex: null | string
  rollbackMessage: null | string
  previewMode: PreviewModes
  sidebarWidth: number
  addBlockIndex: number | null
}

const sidebarWidth = (typeof localStorage !== 'undefined') ? localStorage.getItem('veSidebarWidth') : 0

const createStore = (
  data: EditorComponentData[] = [],
  definitions: EditorComponentDefinitions,
  hiddenCategories: string[] = []
) =>
  create(
    devtools(
      combine(
        {
          data,
          definitions,
          hiddenCategories,
          previousData: [],
          rollbackMessage: null,
          addBlockIndex: null,
          focusIndex: null,
          previewMode: PreviewModes.DESKTOP,
          sidebarWidth: clamp(
            sidebarWidth ? parseInt(sidebarWidth, 10) : 600,
            0,
            window.innerWidth - 375
          ),
        } as State,
        (set) => ({
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
              rollbackMessage: 'Le bloc a bien été supprimé',
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
            const newData = {
              ...extraData,
              _name: name,
              _id: name + uniqId(),
            }
            set((state) => {
              return {
                data: insertItem(state.data, index, newData),
                focusIndex: newData._id,
              }
            })
            return newData
          },
          setFocusIndex: function (id: string) {
            set(() => ({ focusIndex: id }))
          },
          setAddBlockIndex: function (index: number | null) {
            set(() => ({ addBlockIndex: index }))
          },
          togglePreviewMode: function () {
            set(({ previewMode }) => ({
              previewMode:
                previewMode === PreviewModes.DESKTOP
                  ? PreviewModes.PHONE
                  : PreviewModes.DESKTOP,
            }))
          },
        })
      )
    )
  )

type Store = ReturnType<typeof createStore>
// Extrait le type de la donnée à l'intérieur d'un UseBoundStore<T>
type StoreData<T extends UseBoundStore<any>> = T extends UseBoundStore<infer V>
  ? V
  : never

const { Provider, useStore } = createContext<StoreData<Store>>()

export function StoreProvider({
  children,
  data,
  definitions,
  hiddenCategories,
}: {
  children: ReactElement
  data: EditorComponentData[]
  definitions: EditorComponentDefinitions
  hiddenCategories: string[]
}) {
  return (
    <Provider
      createStore={() => createStore(data, definitions, hiddenCategories)}
    >
      {children}
    </Provider>
  )
}

export function useData() {
  return useStore((state) => state.data)
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

export function useSetBlockIndex(): Function {
  return useStore((state) => state.setAddBlockIndex)
}

export function useAddBlock() {
  const insertData = useInsertData()
  const blockIndex = useStore((state) => state.addBlockIndex) || 0
  const definitions = useDefinitions()
  const setBlockIndex = useSetBlockIndex()
  return useCallback(
    (blocName: string) => {
      insertData(
        blocName,
        blockIndex,
        fillDefaults({}, definitions[blocName]!.fields)
      )
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
