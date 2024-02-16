import { FieldComponent } from '../types';
type Option = {
    value: string;
    label: string;
};
type FieldArgs = {
    label?: string;
    options: Option[];
    help?: string;
    default?: string;
};
export declare const Select: (name: string, options?: FieldArgs) => {
    options: FieldArgs;
    name: string;
    group: false;
    defaultOptions: FieldArgs;
    render: FieldComponent<FieldArgs, string, {}>;
    conditions: import("../types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export {};
