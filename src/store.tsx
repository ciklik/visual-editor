import create, { UseStore } from 'zustand'
import { EditorComponentData } from 'src/types'
import { deepSet } from 'src/functions/object'
import { combine, devtools } from 'zustand/middleware'
import { insertItem } from 'src/functions/array'
import { uniqId } from 'src/functions/string'
import { SidebarModes } from 'src/constants'

import createContext from 'zustand/context'
import { ComponentChildren } from 'preact'

export enum PreviewModes {
  PHONE,
  DESKTOP,
}

type State = {
  data: EditorComponentData[]
  focusIndex: null | string
  sidebarMode: SidebarModes
  previewMode: PreviewModes
}

const createStore = (data: EditorComponentData[] = []) =>
  create(
    devtools(
      combine(
        {
          data,
          focusIndex: null,
          sidebarMode: SidebarModes.FIELDS,
          previewMode: PreviewModes.DESKTOP,
        } as State,
        (set) => ({
          setSidebarMode: function (mode: SidebarModes) {
            set(() => ({ sidebarMode: mode }))
          },
          updateData: function (newData: any, path?: string) {
            return set((state) => ({
              data: deepSet(state.data, path, newData),
            }))
          },
          removeBloc: function (removedData: EditorComponentData) {
            return set(({ data }) => ({
              data: data.filter((d) => d !== removedData),
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
                sidebarMode: SidebarModes.FIELDS,
                focusIndex: newData._id,
              }
            })
            return newData
          },
          setFocusIndex: function (id: string) {
            set(() => ({ focusIndex: id }))
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
// Extrait le type de la donnée à l'intérieur d'un UseStore<T>
type StoreData<T extends UseStore<any>> = T extends UseStore<infer V>
  ? V
  : never

const { Provider, useStore } = createContext<StoreData<Store>>()

export function StoreProvider({
  children,
  data,
}: {
  children: ComponentChildren
  data: EditorComponentData[]
}) {
  return <Provider createStore={() => createStore(data)}>{children}</Provider>
}

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

export function useRemoveBloc() {
  return useStore((state) => state.removeBloc)
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

export function usePreviewMode() {
  return useStore((state) => state.previewMode)
}

export function useTogglePreviewMode() {
  return useStore((state) => state.togglePreviewMode)
}

export const store = useStore
