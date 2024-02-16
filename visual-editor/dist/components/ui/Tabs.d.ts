import type { ReactNode } from 'react';
type TabsProps = {
    children: ReactNode;
};
type TabProps = {
    children: ReactNode;
    title: string;
};
export declare function Tabs({ children, ...props }: TabsProps): import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
export declare namespace Tabs {
    var Tab: (props: TabProps) => import("@emotion/react/types/jsx-namespace").EmotionJSX.Element;
}
export {};
