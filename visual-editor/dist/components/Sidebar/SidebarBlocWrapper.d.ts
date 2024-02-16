/// <reference types="react" />
export declare const SidebarBlocWrapper: import("@emotion/styled").StyledComponent<Pick<{
    item: import("../../types").IndexableObject;
    children: import("react").ReactNode;
    className?: string | undefined;
    onClick?: ((e: import("react").SyntheticEvent<Element, Event>) => void) | undefined;
}, "className" | "children" | "onClick" | "item"> & {
    theme?: import("@emotion/react").Theme | undefined;
}, {}, {}>;
