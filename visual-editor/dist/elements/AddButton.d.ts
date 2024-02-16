declare const AddButton_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * Custom element usable within an iframe to display a button to add a new bloc
 */
export declare class AddButton extends AddButton_base {
    connectedCallback(): void;
}
export {};
