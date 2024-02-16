import type { EventHandler, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';
type FlashProps = PropsWithChildren<{
    action?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onHide?: EventHandler<any>;
    onExit?: Function;
    duration?: number;
}>;
export declare function Flash({ children, action, onClick, duration, onHide, }: FlashProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
