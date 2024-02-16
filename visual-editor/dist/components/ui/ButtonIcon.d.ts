/// <reference types="react" />
type ButtonProps = JSX.IntrinsicElements['button'] & {
    danger?: boolean;
    success?: boolean;
    rotate?: number;
    title?: string;
};
export declare function ButtonIcon({ danger, success, rotate, title, ...props }: ButtonProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
