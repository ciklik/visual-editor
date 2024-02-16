import { EditorComponentData, EditorComponentDefinitions, EditorComponentTemplate } from './types';
import { ReactElement } from 'react';
import { InsertPosition } from './enum';
export declare enum PreviewModes {
    PHONE = 0,
    DESKTOP = 1
}
type State = {
    data: EditorComponentData[];
    templates: EditorComponentTemplate[];
    previousData: EditorComponentData[];
    definitions: EditorComponentDefinitions;
    hiddenCategories: string[];
    focusIndex: null | string;
    rollbackMessage: null | string;
    previewMode: PreviewModes;
    sidebarWidth: number;
    addBlockIndex: number | null;
    rootElement: HTMLElement;
    insertPosition: InsertPosition;
};
declare const createStore: (data: EditorComponentData[] | undefined, definitions: EditorComponentDefinitions, hiddenCategories: string[] | undefined, rootElement: HTMLElement, templates: EditorComponentTemplate[], insertPosition: InsertPosition) => import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<Omit<State, "rollback" | "setSidebarWidth" | "updateData" | "removeBloc" | "voidRollback" | "insertData" | "setData" | "setFocusIndex" | "setAddBlockIndex" | "togglePreviewMode"> & {
    setSidebarWidth: (width: number) => void;
    updateData: (newData: any, path?: string) => void;
    removeBloc: (removedData: EditorComponentData) => void;
    rollback: () => void;
    voidRollback: () => void;
    insertData: (name: string, index: number, extraData?: object) => EditorComponentData;
    setData: (newData: Omit<EditorComponentData, '_id'>[]) => void;
    setFocusIndex: (id: string) => void;
    setAddBlockIndex: (index?: number | string | null) => void;
    togglePreviewMode: () => void;
}>, "setState"> & {
    setState<A extends string | {
        type: unknown;
    }>(partial: (Omit<State, "rollback" | "setSidebarWidth" | "updateData" | "removeBloc" | "voidRollback" | "insertData" | "setData" | "setFocusIndex" | "setAddBlockIndex" | "togglePreviewMode"> & {
        setSidebarWidth: (width: number) => void;
        updateData: (newData: any, path?: string) => void;
        removeBloc: (removedData: EditorComponentData) => void;
        rollback: () => void;
        voidRollback: () => void;
        insertData: (name: string, index: number, extraData?: object) => EditorComponentData;
        setData: (newData: Omit<EditorComponentData, '_id'>[]) => void;
        setFocusIndex: (id: string) => void;
        setAddBlockIndex: (index?: number | string | null) => void;
        togglePreviewMode: () => void;
    }) | Partial<Omit<State, "rollback" | "setSidebarWidth" | "updateData" | "removeBloc" | "voidRollback" | "insertData" | "setData" | "setFocusIndex" | "setAddBlockIndex" | "togglePreviewMode"> & {
        setSidebarWidth: (width: number) => void;
        updateData: (newData: any, path?: string) => void;
        removeBloc: (removedData: EditorComponentData) => void;
        rollback: () => void;
        voidRollback: () => void;
        insertData: (name: string, index: number, extraData?: object) => EditorComponentData;
        setData: (newData: Omit<EditorComponentData, '_id'>[]) => void;
        setFocusIndex: (id: string) => void;
        setAddBlockIndex: (index?: number | string | null) => void;
        togglePreviewMode: () => void;
    }> | ((state: Omit<State, "rollback" | "setSidebarWidth" | "updateData" | "removeBloc" | "voidRollback" | "insertData" | "setData" | "setFocusIndex" | "setAddBlockIndex" | "togglePreviewMode"> & {
        setSidebarWidth: (width: number) => void;
        updateData: (newData: any, path?: string) => void;
        removeBloc: (removedData: EditorComponentData) => void;
        rollback: () => void;
        voidRollback: () => void;
        insertData: (name: string, index: number, extraData?: object) => EditorComponentData;
        setData: (newData: Omit<EditorComponentData, '_id'>[]) => void;
        setFocusIndex: (id: string) => void;
        setAddBlockIndex: (index?: number | string | null) => void;
        togglePreviewMode: () => void;
    }) => (Omit<State, "rollback" | "setSidebarWidth" | "updateData" | "removeBloc" | "voidRollback" | "insertData" | "setData" | "setFocusIndex" | "setAddBlockIndex" | "togglePreviewMode"> & {
        setSidebarWidth: (width: number) => void;
        updateData: (newData: any, path?: string) => void;
        removeBloc: (removedData: EditorComponentData) => void;
        rollback: () => void;
        voidRollback: () => void;
        insertData: (name: string, index: number, extraData?: object) => EditorComponentData;
        setData: (newData: Omit<EditorComponentData, '_id'>[]) => void;
        setFocusIndex: (id: string) => void;
        setAddBlockIndex: (index?: number | string | null) => void;
        togglePreviewMode: () => void;
    }) | Partial<Omit<State, "rollback" | "setSidebarWidth" | "updateData" | "removeBloc" | "voidRollback" | "insertData" | "setData" | "setFocusIndex" | "setAddBlockIndex" | "togglePreviewMode"> & {
        setSidebarWidth: (width: number) => void;
        updateData: (newData: any, path?: string) => void;
        removeBloc: (removedData: EditorComponentData) => void;
        rollback: () => void;
        voidRollback: () => void;
        insertData: (name: string, index: number, extraData?: object) => EditorComponentData;
        setData: (newData: Omit<EditorComponentData, '_id'>[]) => void;
        setFocusIndex: (id: string) => void;
        setAddBlockIndex: (index?: number | string | null) => void;
        togglePreviewMode: () => void;
    }>), replace?: boolean | undefined, action?: A | undefined): void;
}>;
type Store = ReturnType<typeof createStore>;
type StoreState = Store extends {
    getState: () => infer T;
} ? T : never;
export declare function StoreProvider({ children, data, definitions, hiddenCategories, rootElement, templates, insertPosition, }: {
    children: ReactElement;
    data: EditorComponentData[];
    templates: EditorComponentTemplate[];
    definitions: EditorComponentDefinitions;
    hiddenCategories: string[];
    rootElement: HTMLElement;
    insertPosition: InsertPosition;
}): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
declare function useStore<T>(selector: (state: StoreState) => T): T;
export declare function useData(): EditorComponentData[];
export declare function useRootElement(): HTMLElement;
export declare function useUpdateData(): (newData: any, path?: string | undefined) => void;
export declare function useRemoveBloc(): (removedData: EditorComponentData) => void;
export declare function useInsertData(): (name: string, index: number, extraData?: object | undefined) => EditorComponentData;
export declare function useSetData(): (newData: Omit<EditorComponentData, "_id">[]) => void;
export declare function useFocusIndex(): string | null;
export declare function useDefinitions(): EditorComponentDefinitions;
export declare function useSetFocusIndex(): (id: string) => void;
export declare function useFieldFocused(id: string): boolean;
export declare function usePreviewMode(): PreviewModes;
export declare function useTogglePreviewMode(): () => void;
export declare function useSidebarWidth(): number;
export declare function useSetSidebarWidth(): (width: number) => void;
export declare function useFieldDefinitions(): EditorComponentDefinitions;
export declare function useHiddenCategories(): string[];
export declare function useBlocSelectionVisible(): boolean;
export declare function useSetBlockIndex(): (index?: string | number | null | undefined) => void;
export declare function useTemplates(): EditorComponentTemplate[];
export declare function useAddBlock(): (blocName: string) => void;
export declare function useRollbackMessage(): {
    message: string | null;
    rollback: () => void;
    voidRollback: () => void;
};
export declare const store: typeof useStore;
export {};
