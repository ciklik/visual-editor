import { EditorComponentData } from '../../types';
import React from 'react';
type PreviewItemProps = {
    data: EditorComponentData;
    initialHTML: string;
    previewUrl: string;
    title: string;
};
export declare function PreviewItem({ data, initialHTML, previewUrl, title, }: PreviewItemProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export declare const PreviewItemWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
} & {
    isFocused: boolean;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const PreviewItemTitle: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
} & {
    isFocused: boolean;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export {};
