import type { ReactNode } from 'react';
type ModalProps = {
    children: ReactNode;
    visible: boolean;
    onVisibilityChange: (visibility: boolean) => void;
    title: ReactNode;
};
export declare function Modal({ children, title, visible, onVisibilityChange, }: ModalProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
