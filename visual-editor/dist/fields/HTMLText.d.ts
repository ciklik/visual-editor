import { FieldComponent } from '../types';
type FieldArgs = {
    label?: string;
    multiline?: boolean;
    help?: string;
    allowHeadings?: boolean;
    colors?: string[];
    default?: string;
    backgroundColor?: string;
    textColor?: string;
    defaultAlign?: string;
};
type ExtraParams = {
    backgroundColor?: string;
    textColor?: string;
    defaultAlign?: 'left' | 'right' | 'center' | 'justify';
};
export declare const HTMLText: (name: string, options?: FieldArgs) => {
    conditions: import("../types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
    name: string;
    options: {
        label?: string | undefined;
        multiline: boolean;
        help?: string | undefined;
        allowHeadings: boolean;
        colors?: string[] | undefined;
        default: string;
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        defaultAlign?: string | undefined;
    };
    extraProps: (data: Record<string, unknown>) => {
        backgroundColor: string | undefined;
        textColor: string | undefined;
        defaultAlign: unknown;
    };
    render: FieldComponent<FieldArgs, string, ExtraParams>;
};
export {};
