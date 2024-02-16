import { FieldComponent } from '../types';
type FieldArgs = {
    label?: string;
    vertical?: boolean;
    default?: FieldValue;
};
type FieldValue = 'top' | 'right' | 'bottom' | 'left';
export declare const Alignment: (name: string, options?: FieldArgs) => {
    options: FieldArgs;
    name: string;
    group: false;
    defaultOptions: FieldArgs;
    render: FieldComponent<FieldArgs, FieldValue, {}>;
    conditions: import("../types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export {};
