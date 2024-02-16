import { RefObject } from 'react';
type EventNames = keyof HTMLElementEventMap;
export declare function useStopPropagation(ref: RefObject<HTMLElement>, eventNames: EventNames[]): void;
export {};
