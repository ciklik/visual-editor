import type { PreviewProps } from '../../components/Preview/Preview';
import { EditorComponentData } from '../../types';
export type EditorMessageEvents = {
    type: 've-focus';
    payload: {
        id: string;
    };
} | {
    type: 've-data';
    payload: EditorComponentData[];
};
/**
 * Alternative preview component based on postMessage to communicate using
 * cross domain
 */
export declare function PreviewPostMessage({ data, previewUrl }: PreviewProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
