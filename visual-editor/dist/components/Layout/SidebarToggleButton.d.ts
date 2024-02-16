/// <reference types="react" />
type SidebarToggleButtonProps = {
    collapsed: boolean;
    onClick: Function;
};
export declare function SidebarToggleButton({ collapsed, onClick, }: SidebarToggleButtonProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export declare const Button: import("@emotion/styled").StyledComponent<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    danger?: boolean | undefined;
    success?: boolean | undefined;
    rotate?: number | undefined;
    title?: string | undefined;
} & {
    theme?: import("@emotion/react").Theme | undefined;
} & {
    collapsed: boolean;
}, {}, {}>;
export {};
