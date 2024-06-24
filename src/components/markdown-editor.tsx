import { Dispatch } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useTheme } from "./theme-provider";
import { light } from "@/lib/code-mirror/light-theme";
import { dark } from "@/lib/code-mirror/dark-theme";

interface Props {
  input: string;
  setInput: Dispatch<React.SetStateAction<string>>;
}

export default function MarkdownEditor({ input, setInput }: Props) {
  const { theme } = useTheme();

  const handleChange = (content: string) => {
    setInput(content);
  };

  return (
    <>
      <CodeMirror
        className="w-full h-full border-none"
        theme={theme === "dark" ? dark : light}
        height={"100%"}
        width={"100%"}
        value={input}
        onChange={handleChange}
        extensions={[EditorView.lineWrapping]}
      />
    </>
  );
}
