import { FieldComponent } from '../types';
import { IconTextCenter, IconTextLeft, IconTextRight } from '../components/ui';
declare const AlignmentIcons: {
    left: typeof IconTextLeft;
    center: typeof IconTextCenter;
    right: typeof IconTextRight;
};
type FieldValue = keyof typeof AlignmentIcons;
type FieldArgs = {
    label?: string;
    default?: FieldValue;
};
export declare const TextAlign: (name: string, options?: FieldArgs) => {
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
