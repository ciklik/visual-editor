import { FieldDefinition, FieldGroupComponent } from '../types';
type TabDefinition = {
    label: string;
    fields: Array<FieldDefinition<any, any>>;
};
type FieldOptions = {
    tabs: TabDefinition[];
};
export declare function Tabs(...tabs: TabDefinition[]): {
    group: true;
    options: {
        tabs: TabDefinition[];
    };
    render: FieldGroupComponent<FieldOptions>;
    fields: FieldDefinition<any, any>[];
    conditions: import("../types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export {};
