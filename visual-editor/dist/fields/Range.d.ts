import { FieldComponent } from '../types';
type FieldArgs = {
    label?: string;
    help?: string;
    default?: number;
    min?: number;
    max?: number;
    step?: number;
};
export declare const Range: (name: string, options?: FieldArgs) => {
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
