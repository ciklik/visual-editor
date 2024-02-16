import { PropsWithChildren } from 'react';
type SidebarHeaderProps = PropsWithChildren<{
    onClose: () => void;
}>;
export declare function SidebarHeader({ onClose, children }: SidebarHeaderProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
