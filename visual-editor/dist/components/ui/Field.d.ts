import type { ReactNode } from 'react';
type Option = {
    value: string;
    label: string;
};
type FieldProps = {
    label?: ReactNode;
    help?: ReactNode;
    options?: Option[];
    tooltip?: ReactNode;
    icon?: ReactNode;
} & JSX.IntrinsicElements['input'] & JSX.IntrinsicElements['textarea'] & JSX.IntrinsicElements['select'];
export declare function Field({ children, label, help, type, options, tooltip, icon, ...props }: FieldProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
