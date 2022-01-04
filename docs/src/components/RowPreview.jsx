import { Text, Row, Select } from "../../../visual-editor/dist/VisualEditor.js";
import { useState } from "react";
import React from "react";
import { DemoWrapper } from "./DemoWrapper";

export function RowPreview() {
  const Component = Row([
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
  ]);

  return (
    <DemoWrapper>
      <Component.render options={{}}>
        {Component.fields.map((field) => (
          <FieldRenderer key={field} field={field} />
        ))}
      </Component.render>
    </DemoWrapper>
  );
}

function FieldRenderer({ field }) {
  const [state, setState] = useState("");
  const FieldComponent = field.render;
  return (
    <FieldComponent value={state} onChange={setState} options={field.options} />
  );
}
