import { Descendant, Node as SlateNode } from "slate";

export const serialize = (value: SlateNode[]) => {
  return value
    .map((n) => {
      return SlateNode.string(n);
    })
    .join("\n");
};

export const deserialize = (str: string) => {
  return str.split("\n").map((line) => {
    return {
      type: "paragraph",
      children: [{ text: line }],
    } as Descendant;
  });
};

// const annotationToText = ({ attributes, children, leaf }: any) => {
//   if (leaf.bold) {
//     children = <strong>**{children}**</strong>;
//   }

//   if (leaf.code) {
//     children = <code>{children}</code>;
//   }

//   if (leaf.italic) {
//     children = <em>{children}</em>;
//   }

//   if (leaf.underline) {
//     children = <u>{children}</u>;
//   }

//   return <span {...attributes}>{children}</span>;
// };
