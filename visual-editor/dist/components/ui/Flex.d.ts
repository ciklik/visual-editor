import { ElementType } from 'react';
type FlexProps = {
    between?: boolean;
    column?: boolean;
    gap?: number;
    as?: ElementType<any>;
} & JSX.IntrinsicElements['div'];
export declare const Flex: import("react").ForwardRefExoticComponent<Omit<FlexProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export {};
