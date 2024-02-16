import type { EditorComponentDefinition } from '../../types';
type FieldsRendererProps = {
    fields: EditorComponentDefinition['fields'];
    data: Record<string, unknown>;
    onUpdate: (value: unknown, path: string) => void;
    path: string;
};
export declare function FieldsRenderer({ data, fields, path, onUpdate, }: FieldsRendererProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
