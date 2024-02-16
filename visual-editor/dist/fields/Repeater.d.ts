import { FieldComponent, FieldDefinition } from '../types';
type FieldValue = RepeaterLine[];
type FieldArgs = {
    label?: string;
    min?: number;
    max?: number;
    addLabel?: string;
    fields: FieldDefinition<any, any>[];
    collapsed?: string;
    default?: FieldValue;
};
type RepeaterLine = {
    _id: string;
    [key: string]: unknown;
};
export declare const Repeater: (name: string, options?: FieldArgs) => {
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
