type Keypath = string | string[];
type ExplorableObject = Record<string, unknown> | Array<Object>;
export declare function deepSet(object: ExplorableObject, keyPath: Keypath | undefined, value: any): any;
export declare function stringifyFields(source: any): string;
/**
 * Add _id on every objects in an array to simplify identification of element
 */
export declare function indexify<T extends Record<string, unknown>>(object: T): T & {
    _id: string;
};
export declare function indexify<T extends Record<string, unknown>>(object: T[]): (T & {
    _id: string;
})[];
/**
 * Convertit la valeur dans le même type que le second paramètre
 */
export declare function cast<V>(value: unknown, expectedValue: V): "" | (V & boolean) | (V & string);
export {};
