import { ReactNode } from 'react';
type TooltipProps = {
    content: ReactNode;
    children: ReactNode;
    visible?: boolean;
    trigger?: 'click' | 'focus';
};
export declare function Tooltip({ content, children, visible, trigger }: TooltipProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
