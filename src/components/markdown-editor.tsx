import Prism from "prismjs";
import "prismjs/components/prism-markdown";
import React, { Dispatch, useCallback, useMemo, useState } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { Text, createEditor, Node as SlateNode, Descendant } from "slate";
import { withHistory } from "slate-history";
import { Entry } from "@/models/entry";
import { useMutation } from "@tanstack/react-query";
import { updateEntry } from "@/api/entry";
import Toolbar from "./toolbar";
import { deserialize, serialize } from "@/lib/slate/serializer";

interface Props {
  entry: Entry;
  input: string;
  setInput: Dispatch<React.SetStateAction<string>>;
}

export default function MarkdownEditor({ entry, input, setInput }: Props) {
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const initialValue: Descendant[] = useMemo(() => {
    return (
      deserialize(input) || [
        {
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ]
    );
  }, [input]);

  const decorate = useCallback(([node, path]) => {
    const ranges = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token) => {
      if (typeof token === "string") {
        return token.length;
      } else if (typeof token.content === "string") {
        return token.content.length;
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0);
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }

    return ranges;
  }, []);

  const { mutateAsync } = useMutation({
    mutationFn: async (value: string) => {
      updateEntry({ ...entry, content: value });
    },
  });

  const handleChange = (value: SlateNode[]) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    // If anything besides the selection was changed
    if (isAstChange) {
      const content = serialize(value);
      mutateAsync(content);
      setInput(content);
    }
  };

  editor.children = initialValue;
  return (
    <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
      {/* <Toolbar /> */}
      <Editable
        className="outline-none px-6 py-4 h-full overflow-y-scroll"
        decorate={decorate}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
}

const Leaf = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      className={`${leaf.bold && "font-bold"}
        ${leaf.italic && "italic"}
        ${leaf.underlined && "underline"}
        ${leaf.title && "inline-block font-bold mb-3"}
        ${leaf.list && "pl-3 leading-3"}
        ${leaf.hr && "block text-center border border-b-2 border-gray-200"}
        ${
          leaf.blockquote &&
          "inline-block border border-l-2 border-gray-200 pl-3 text-gray-200 italic"
        }
        ${leaf.code && "font-mono bg-gray-200 p-1"}
      `}
    >
      {children}
    </span>
  );
};
