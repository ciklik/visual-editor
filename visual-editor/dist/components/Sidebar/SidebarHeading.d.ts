import type { ForwardRefExoticComponent, FunctionComponent, MouseEventHandler, PropsWithChildren, RefAttributes } from 'react';
export declare const SidebarHeading: ForwardRefExoticComponent<{
    title: string;
    description?: string | undefined;
    onClick?: MouseEventHandler<HTMLElement> | undefined;
} & {
    children?: import("react").ReactNode;
} & RefAttributes<HTMLDivElement>> & {
    Hover: typeof SidebarHeadingHoverable;
};
declare const SidebarHeadingHoverable: FunctionComponent<PropsWithChildren<{}>>;
export {};
