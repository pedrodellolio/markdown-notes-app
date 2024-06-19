import { Dispatch } from "react";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
// import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
// import { languages } from "@codemirror/language-data";
import { Entry } from "@/models/entry";
import { useMutation } from "@tanstack/react-query";
import { updateEntry } from "@/api/entry";
// import Toolbar from "./toolbar";
import { useTheme } from "./theme-provider";
import { light } from "@/lib/code-mirror/light-theme";
import { dark } from "@/lib/code-mirror/dark-theme";

interface Props {
  entry: Entry;
  input: string;
  setInput: Dispatch<React.SetStateAction<string>>;
}

export default function MarkdownEditor({ entry, input, setInput }: Props) {
  const { theme } = useTheme();
  const { mutateAsync } = useMutation({
    mutationFn: async (value: string) => {
      await updateEntry({ ...entry, content: value });
    },
  });

  const handleChange = (content: string) => {
    // mutateAsync(content);
    setInput(content);
  };

  return (
    <>
      {/* <Toolbar /> */}
      <CodeMirror
        className="w-full h-full border-none"
        theme={theme === "dark" ? dark : light}
        height={"100%"}
        width={"100%"}
        value={input}
        onChange={handleChange}
        extensions={[
          EditorView.lineWrapping,
          // markdown({
          //   base: markdownLanguage,
          //   codeLanguages: languages
          // }),
        ]}
      />
    </>
  );
}
