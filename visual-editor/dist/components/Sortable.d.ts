import { ReactNode, SyntheticEvent } from 'react';
import { IndexableObject } from '../types';
type SortableWrapperProps = {
    items: IndexableObject[];
    children: ReactNode;
    onMove: (from: number, to: number) => void;
};
export declare function SortableWrapper({ items, children, onMove, }: SortableWrapperProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
type SortableProps = {
    item: IndexableObject;
    children: ReactNode;
    className?: string;
    onClick?: (e: SyntheticEvent) => void;
};
export declare function Sortable({ item, children, className, ...props }: SortableProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
