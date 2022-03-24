import {
  Checkbox,
  Color,
  HTMLText,
  ImageUrl,
  Number,
  Text,
  Range,
  Select,
  Alignment,
  TextAlign,
  DatePicker
} from "../../../visual-editor/dist/VisualEditor.js";
import React, { useState } from "react";
import { DemoWrapper } from "./DemoWrapper";

const FieldTypes = {
  Text,
  HTMLText,
  Number,
  Checkbox,
  Color,
  ImageUrl,
  Range,
  Select,
  Alignment,
  TextAlign,
  DatePicker
};

export function FieldPreview({ type, args, defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue);
  const FieldComponent = FieldTypes[type](args).render;

  return (
    <DemoWrapper>
      {FieldComponent && (
        <FieldComponent value={value} onChange={setValue} options={args} />
      )}
    </DemoWrapper>
  );
}
