import React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "./theme-provider";

const CodeEditor = ({
  value,
  onChange,
  language = "javascript",
  height = "300px",
  ...options
}) => {
  const { theme: currentTheme = "dark" } = useTheme();

  return (
    <div className="w-full max-w-full overflow-hidden">
      <Editor
        width="100%"
        height={height}
        language={language.toLowerCase()}
        theme={`vs-${currentTheme}`}
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          ...options,
        }}
      />
    </div>
  );
};

export default CodeEditor;
