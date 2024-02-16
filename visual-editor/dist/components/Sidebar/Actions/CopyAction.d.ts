import { EditorComponentData } from '../../../types';
type CopyActionProps = {
    data: EditorComponentData | EditorComponentData[];
    size?: number;
};
export declare function CopyAction({ data, size, ...props }: CopyActionProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
