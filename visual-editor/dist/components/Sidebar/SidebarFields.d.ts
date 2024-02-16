import { EditorComponentData, EditorComponentDefinition } from '../../types';
type SidebarFieldsProps = {
    fields: EditorComponentDefinition['fields'];
    data: EditorComponentData;
    path: string;
};
export declare function SidebarFields({ fields, data, path }: SidebarFieldsProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
