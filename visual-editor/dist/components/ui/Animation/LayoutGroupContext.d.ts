/// <reference types="react" />
export interface LayoutGroupContextProps {
    id?: string;
    group?: any;
    forceRender?: VoidFunction;
}
/**
 * @internal
 */
export declare const LayoutGroupContext: import("react").Context<LayoutGroupContextProps>;
