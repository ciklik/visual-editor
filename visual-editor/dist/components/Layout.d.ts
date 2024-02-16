import { EditorComponentData } from '../types';
type LayoutProps = {
    className?: string;
    data: EditorComponentData[];
    previewUrl?: string;
    onClose: () => void;
    iconsUrl: string;
};
export declare function Layout({ data, previewUrl, onClose, iconsUrl }: LayoutProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
