import { EditorComponentData } from '../types';
export declare function usePreview(data: EditorComponentData, previewUrl: string, initialHTML: string): {
    loading: boolean;
    html: string;
};
