import { FieldComponent } from '../types';
type FieldArgs = {
    label?: string;
    help?: string;
    default?: string;
    onBrowse?: (url?: string) => Promise<string>;
};
export declare const ImageUrl: (name: string, options?: FieldArgs) => {
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
