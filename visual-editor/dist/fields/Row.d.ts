import { FieldGroupComponent } from '../types';
type RowArgs = {
    label?: string;
    columns?: string;
};
export declare const Row: (fields: import("../types").FieldDefinition<any, any>[], options?: RowArgs) => {
    group: true;
    fields: import("../types").FieldDefinition<any, any>[];
    render: FieldGroupComponent<RowArgs>;
    conditions: import("../types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
    options: {
        [x: string]: any;
    } & RowArgs;
};
export {};
