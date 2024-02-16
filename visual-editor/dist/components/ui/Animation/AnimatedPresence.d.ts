import { FunctionComponent, PropsWithChildren } from 'react';
import type { Keyframes } from '@emotion/react';
/**
 * `AnimatePresence` enables the animation of components that have been removed from the tree.
 *
 * When adding/removing more than a single child, every child **must** be given a unique `key` prop.
 *
 * A big part of this code is taken from motion : https://github.com/framer/motion/blob/main/src/components/AnimatePresence/index.tsx
 *
 */
export declare const AnimatePresence: FunctionComponent<PropsWithChildren<{
    in: Keyframes;
    out: Keyframes;
    exitBeforeEnter?: boolean;
}>>;
