import { EditorComponentData } from '../../types';
import React from 'react';
export type PreviewProps = {
    data: EditorComponentData[];
    previewUrl: string;
};
/**
 * Affiche un aperçu du rendu de la page dans une iframe
 */
export declare function Preview({ data, previewUrl }: PreviewProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export declare const PreviewWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const StyledIframe: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
} & {
    loaded: boolean;
    mobile: boolean;
}, React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>, {}>;
