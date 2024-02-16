/// <reference types="react" />
type FrameProviderProps = {
    container: Document;
    children: JSX.Element;
};
/**
 * Create a CSS-in-JS context to inject the CSS in a specific container (useful for iframes)
 */
export declare function FrameProvider({ container, children }: FrameProviderProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
