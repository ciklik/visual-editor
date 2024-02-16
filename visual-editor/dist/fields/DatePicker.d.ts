import { FieldComponent } from '../types';
type FieldArgs = {
    label?: string;
    help?: string;
    default?: string;
    time?: boolean;
};
export declare const DatePicker: (name: string, options?: FieldArgs) => {
    options: FieldArgs;
    name: string;
    group: false;
    defaultOptions: FieldArgs;
    render: FieldComponent<FieldArgs, number, {}>;
    conditions: import("../types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export {};
