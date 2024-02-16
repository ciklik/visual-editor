import type { FieldComponent, FieldCondition, FieldDefinition, FieldGroupComponent } from '../types';
type FieldOption = Record<string, any>;
/**
 * Helpers to ease the creation of new field type
 */
export declare function defineField<Options extends FieldOption, Value>(args: {
    defaultOptions: Options;
    render: FieldComponent<Options, Value>;
} | (() => {
    defaultOptions: Options;
    render: FieldComponent<Options, Value>;
})): (name: string, options?: Options) => {
    options: Options;
    name: string;
    group: false;
    defaultOptions: Options;
    render: FieldComponent<Options, Value>;
    conditions: FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export declare function defineFieldGroup<Options extends FieldOption>(args: {
    defaultOptions: Options;
    render: FieldGroupComponent<Options>;
}): (fields: FieldDefinition<any, any>[], options?: Options) => {
    group: true;
    fields: FieldDefinition<any, any>[];
    render: FieldGroupComponent<Options>;
    conditions: FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
    options: {
        [x: string]: any;
    } & Options;
};
export declare function defaultFieldProperties(): {
    conditions: FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export {};
