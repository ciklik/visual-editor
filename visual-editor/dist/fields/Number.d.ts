import { FieldComponent } from '../types';
type FieldArgs = {
    label?: string;
    multiline?: boolean;
    help?: string;
    default?: string;
};
export declare const Number: (name: string, options?: FieldArgs) => {
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
