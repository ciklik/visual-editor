import create from 'zustand'
import { EditorComponentData } from './types'
import { deepSet } from './functions/object'
import { combine } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { insertItem } from './functions/array'
import { uniqId } from './functions/string'
import { SidebarModes } from './constants'
import { useCallback } from 'preact/hooks'

type State = {
  data: EditorComponentData[]
  focusIndex: null | string
  sidebarMode: SidebarModes
}

const useStore = create(
  devtools(
    combine(
      {
        data: [],
        focusIndex: null,
        sidebarMode: SidebarModes.FIELDS,
      } as State,
      (set) => ({
        setSidebarMode: function (mode: SidebarModes) {
          set(() => ({ sidebarMode: mode }))
        },
        updateData: function (newData: any, path?: string) {
          return set((state) => ({ data: deepSet(state.data, path, newData) }))
        },
        insertData: function (
          name: string,
          index: number
        ): EditorComponentData {
          const newData = {
            _name: name,
            _id: name + uniqId(),
          }
          set(({ data }) => ({
            data: insertItem(data, index, newData),
            sidebarMode: SidebarModes.FIELDS,
            focusIndex: newData._id,
          }))
          return newData
        },
        setFocusIndex: function (id: string) {
          set(() => ({ focusIndex: id }))
        },
      })
    )
  )
)

export function useSidebarMode() {
  return useStore((state) => state.sidebarMode)
}

export function useSetSidebarMode() {
  return useStore((state) => state.setSidebarMode)
}

export function useData() {
  return useStore((state) => state.data)
}

export function useUpdateData() {
  return useStore((state) => state.updateData)
}

export function useInsertData() {
  return useStore((state) => state.insertData)
}

export function useFocusIndex() {
  return useStore((state) => state.focusIndex)
}

export function useSetFocusIndex() {
  return useStore((state) => state.setFocusIndex)
}

export function useFieldFocused(id: string) {
  return useStore((state) => state.focusIndex === id)
}
