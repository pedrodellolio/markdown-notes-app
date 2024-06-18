import { Dispatch, useCallback, useMemo, useState } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { Descendant, createEditor } from "slate";
import { useMutation } from "@tanstack/react-query";
import { updateEntry } from "@/api/entry";
import { Entry } from "@/models/entry";
import { withHistory } from "slate-history";
import { HOTKEYS } from "@/lib/slate/constants";
import Toolbar from "./toolbar";
import isHotkey from "is-hotkey";
import { toggleMark } from "@/lib/slate/actions";

interface Props {
  entry: Entry;
  input: Descendant[];
  setInput: Dispatch<React.SetStateAction<Descendant[]>>;
}

export default function TextEditor({ entry, input, setInput }: Props) {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const [editor] = useState(() => withHistory(withReact(createEditor())));
  //   const [lastSaved, setLastSaved] = useState<Date | null>(null);
  //   const updateInterval = 10000; // 10 seconds

  const initialValue: Descendant[] = useMemo(
    () =>
      input.length === 0
        ? [
            {
              type: "paragraph",
              children: [{ text: "A line of text in a paragraph." }],
            },
          ]
        : input,
    []
  );

  const { mutateAsync } = useMutation({
    mutationFn: async (value: Descendant[]) => {
      // updateEntry({ ...entry, content: value });
    },
  });

  //   const saveContent = useCallback(async () => {
  //     if (entry?.content !== input) {
  //       await mutateAsync();
  //       setLastSaved(new Date());
  //     }
  //   }, [entry, mutateAsync]);

  //   useEffect(() => {
  //     const intervalId = setInterval(saveContent, updateInterval);
  //     return () => {
  //       clearInterval(intervalId);
  //       // saveContent();
  //     };
  //   }, [saveContent, updateInterval]);

  const handleChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );

    // If anything besides the selection was changed
    if (isAstChange) {
      mutateAsync(value);
      setInput(value);
    }
  };

  return (
    <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
      <Toolbar />
      <Editable
        autoFocus
        spellCheck
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        className="outline-none"
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 className="prose-2xl" style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
