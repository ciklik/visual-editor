import { BaseStyles } from "../../../visual-editor/dist/VisualEditor.js";
import BrowserOnly from "@docusaurus/BrowserOnly";
import React from "react";

export function DemoWrapper({ children }) {
  return (
    <BrowserOnly>
      {() => (
        <BaseStyles>
          <div className="PreviewCard">{children}</div>
        </BaseStyles>
      )}
    </BrowserOnly>
  );
}
