import type { FunctionComponent } from 'react';
type Props<T extends unknown> = {
    value: T;
    checked: boolean;
    icon: FunctionComponent;
    onChange: (v: T) => void;
    name?: string;
};
export declare function AlignmentButton<T extends unknown>({ value, onChange, icon: IconComponent, ...props }: Props<T>): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
