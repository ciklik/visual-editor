import {
  Text,
  Row,
  Select,
  Tabs,
  FieldsRenderer,
} from "../../../visual-editor/dist/VisualEditor.js";
import { useState } from "react";
import React from "react";
import { DemoWrapper } from "./DemoWrapper";

export function TabsPreview() {
  const Component = Tabs(
    {
      label: "Content",
      fields: [
        Text("text1", { label: "Text 1" }),
        Text("text2", { label: "Text 2" }),
      ],
    },
    {
      label: "Settings",
      fields: [Text("text3", { label: "Text 3" })],
    }
  );
  const [data, setData] = useState({ text1: "", text2: "", text3: "" });
  const handleUpdate = (v, path) =>
    setData({ ...data, [path.replaceAll("root.", "")]: v });

  return (
    <DemoWrapper>
      <Component.render options={Component.options}>
        <FieldsRenderer
          fields={[Component]}
          data={data}
          onUpdate={handleUpdate}
          path="root"
        />
      </Component.render>
    </DemoWrapper>
  );
}
