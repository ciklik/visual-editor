/// <reference types="react" />
type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'icon'> & {
    secondary?: boolean;
    outline?: boolean;
    icon?: (...args: any) => JSX.Element;
    size?: 'small' | 'default';
};
export declare function Button({ children, icon: IconElement, size, secondary, outline, ...props }: ButtonProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
