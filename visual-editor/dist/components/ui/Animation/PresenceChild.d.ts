import * as React from 'react';
import type { Keyframes } from '@emotion/react';
interface PresenceChildProps {
    children: React.ReactElement<any>;
    isPresent: boolean;
    onExitComplete?: () => void;
    in: Keyframes;
    out: Keyframes;
}
export declare const PresenceChild: ({ children, isPresent, onExitComplete, in: inKeyframes, out: outKeyframes, }: PresenceChildProps) => import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export {};
