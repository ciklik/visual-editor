import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import data from "./data.json";

export function EditorDemo({ className }) {
  const [editorVisibility, setEditorVisibility] = useState("hidden");
  const ref = useRef();

  useEffect(() => {
    import("./shared");
    ref.current.addEventListener("close", () => setEditorVisibility("hidden"));
  }, [ref.current]);
  return (
    <>
      <button
        className={`button button--secondary ${className}`}
        onClick={() =>
          setEditorVisibility((v) => (v === undefined ? "hidden" : undefined))
        }
      >
        Test the editor
      </button>
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <div
            style={{
              zIndex: 9999,
              position: "relative",
              isolation: "isolate",
            }}
          >
            <visual-editor
              hidden={editorVisibility}
              name="content"
              preview="https://visual-editor.droapp.com"
              iconsUrl="/visual-editor/img/[name].svg"
              value={JSON.stringify(data)}
              ref={ref}
            />
          </div>,
          document.body
        )}
    </>
  );
}
