import { Editor } from '@tiptap/react';
type Props = {
    editor: Editor;
    colors: string[];
};
export declare function TiptapColorPicker({ editor, colors }: Props): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element | null;
export declare function Palette({ colors, onChange, }: {
    colors: string[];
    onChange: (v: string) => void;
}): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
