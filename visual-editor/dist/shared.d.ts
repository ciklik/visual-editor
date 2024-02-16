import { FieldDefinition } from './types';
export declare const Colors: string[];
export declare const ImageField: (name?: string, label?: string) => {
    options: {
        label?: string | undefined;
        help?: string | undefined;
        default?: string | undefined;
        onBrowse?: ((url?: string | undefined) => Promise<string>) | undefined;
    };
    name: string;
    group: false;
    defaultOptions: {
        label?: string | undefined;
        help?: string | undefined;
        default?: string | undefined;
        onBrowse?: ((url?: string | undefined) => Promise<string>) | undefined;
    };
    render: import("./types").FieldComponent<{
        label?: string | undefined;
        help?: string | undefined;
        default?: string | undefined;
        onBrowse?: ((url?: string | undefined) => Promise<string>) | undefined;
    }, string, {}>;
    conditions: import("./types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export declare const ButtonField: () => {
    group: true;
    fields: FieldDefinition<any, any>[];
    render: import("./types").FieldGroupComponent<{
        label?: string | undefined;
        columns?: string | undefined;
    }>;
    conditions: import("./types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
    options: {
        [x: string]: any;
    } & {
        label?: string | undefined;
        columns?: string | undefined;
    };
};
export declare const ColorField: (name: string, label: string) => {
    options: {
        label?: string | undefined;
        default?: string | undefined;
        colors: string[];
    };
    name: string;
    group: false;
    defaultOptions: {
        label?: string | undefined;
        default?: string | undefined;
        colors: string[];
    };
    render: import("./types").FieldComponent<{
        label?: string | undefined;
        default?: string | undefined;
        colors: string[];
    }, string | null, {}>;
    conditions: import("./types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export declare const TitleField: (name?: string, label?: string) => {
    group: true;
    fields: FieldDefinition<any, any>[];
    render: import("./types").FieldGroupComponent<{
        label?: string | undefined;
        columns?: string | undefined;
    }>;
    conditions: import("./types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
    options: {
        [x: string]: any;
    } & {
        label?: string | undefined;
        columns?: string | undefined;
    };
};
export declare const ContentField: (name?: string, label?: string) => {
    conditions: import("./types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
    name: string;
    options: {
        label?: string | undefined;
        multiline: boolean;
        help?: string | undefined;
        allowHeadings: boolean;
        colors?: string[] | undefined;
        default: string;
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        defaultAlign?: string | undefined;
    };
    extraProps: (data: Record<string, unknown>) => {
        backgroundColor: string | undefined;
        textColor: string | undefined;
        defaultAlign: unknown;
    };
    render: import("./types").FieldComponent<{
        label?: string | undefined;
        multiline?: boolean | undefined;
        help?: string | undefined;
        allowHeadings?: boolean | undefined;
        colors?: string[] | undefined;
        default?: string | undefined;
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        defaultAlign?: string | undefined;
    }, string, {
        backgroundColor?: string | undefined;
        textColor?: string | undefined;
        defaultAlign?: "center" | "left" | "right" | "justify" | undefined;
    }>;
};
export declare const ButtonsField: () => {
    options: {
        label?: string | undefined;
        min?: number | undefined;
        max?: number | undefined;
        addLabel?: string | undefined;
        fields: FieldDefinition<any, any>[];
        collapsed?: string | undefined;
        default?: {
            [key: string]: unknown;
            _id: string;
        }[] | undefined;
    };
    name: string;
    group: false;
    defaultOptions: {
        label?: string | undefined;
        min?: number | undefined;
        max?: number | undefined;
        addLabel?: string | undefined;
        fields: FieldDefinition<any, any>[];
        collapsed?: string | undefined;
        default?: {
            [key: string]: unknown;
            _id: string;
        }[] | undefined;
    };
    render: import("./types").FieldComponent<{
        label?: string | undefined;
        min?: number | undefined;
        max?: number | undefined;
        addLabel?: string | undefined;
        fields: FieldDefinition<any, any>[];
        collapsed?: string | undefined;
        default?: {
            [key: string]: unknown;
            _id: string;
        }[] | undefined;
    }, {
        [key: string]: unknown;
        _id: string;
    }[], {}>;
    conditions: import("./types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
};
export declare const Style: () => any[];
export declare const WithStyles: (contentFields: FieldDefinition<any, any>[], styleFields?: FieldDefinition<any, any>[]) => {
    group: true;
    options: {
        tabs: {
            label: string;
            fields: FieldDefinition<any, any>[];
        }[];
    };
    render: import("./types").FieldGroupComponent<{
        tabs: {
            label: string;
            fields: FieldDefinition<any, any>[];
        }[];
    }>;
    fields: FieldDefinition<any, any>[];
    conditions: import("./types").FieldCondition[];
    shouldRender(data: Record<string, any>): boolean;
    when(fieldName: string, expectedValue?: unknown): any;
}[];
