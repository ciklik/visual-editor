import { createRoot } from 'react-dom/client';
import { SyntheticEvent } from 'react';
import { EditorMessageEvents } from '../components/Preview/PreviewPostMessage';
declare const PreviewWrapper_base: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
/**
 * Custom element usable within an iframe to get editor capabilities
 *
 * ## Example
 *
 * If you are building the preview using another framework you can wrap with
 * this custom element
 *
 * ```html
 *   <div v-for='bloc in data' :key='bloc._id'>
 *     <bloc-item :data-id='bloc._id'>
 *       <component :is="components[bloc._name]" v-bind='bloc' />
 *     </bloc-item>
 *   </div>
 * ```
 */
export declare class PreviewWrapper extends PreviewWrapper_base {
    isFocused: boolean;
    root: ReturnType<typeof createRoot> | undefined;
    referrer: () => string;
    onWrapperClick: () => void;
    onAddClick: (e: SyntheticEvent) => void;
    render(): void;
    onFocusChange: (e: MessageEvent<EditorMessageEvents>) => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export {};
