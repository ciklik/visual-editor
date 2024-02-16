import { EditorComponentData } from '../../types';
/**
 * Gère le rendu dans l'iframe des différents composants
 */
export declare function PreviewItems({ data, initialHTML, previewUrl, }: {
    data: EditorComponentData[];
    initialHTML: Record<string, string>;
    previewUrl: string;
}): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
