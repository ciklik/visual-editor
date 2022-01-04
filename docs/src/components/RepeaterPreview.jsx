import {
  BaseStyles,
  Text,
  Select,
  Repeater,
} from "../../../visual-editor/dist/VisualEditor.js";
import { useState } from "react";
import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { DemoWrapper } from "./DemoWrapper";

export function RepeaterPreview() {
  const Component = Repeater("hello", {
    label: "Buttons",
    addLabel: "Add a new button",
    collapsed: "label",
    fields: [
      Text("label", { label: "Button Label", default: "Call to action" }),
      Text("url", { label: "Link" }),
      Select("type", {
        default: "primary",
        label: "type",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Secondary", value: "secondary" },
        ],
      }),
    ],
  });
  const [value, setValue] = useState([
    {
      _id: "a",
      label: "Buy",
      url: "/",
      type: "primary",
    },
    {
      _id: "b",
      label: "Getting started",
      url: "/",
      type: "secondary",
    },
  ]);

  return (
    <DemoWrapper>
      <Component.render
        value={value}
        onChange={setValue}
        options={Component.options}
      />
    </DemoWrapper>
  );
}
