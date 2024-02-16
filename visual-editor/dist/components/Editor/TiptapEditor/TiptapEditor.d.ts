type TiptapEditorProps = {
    value: string;
    onChange: (v: string) => void;
    colors?: string[];
    backgroundColor?: string;
    color?: string;
    multiline?: boolean;
    defaultAlign?: 'left' | 'right' | 'center' | 'justify';
};
export declare function TiptapEditor({ value, onChange, multiline, colors, defaultAlign, backgroundColor, color, }: TiptapEditorProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
