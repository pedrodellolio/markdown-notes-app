import { Editor, Transforms, Element as SlateElement } from "slate";
import { LIST_TYPES, TEXT_ALIGN_TYPES } from "./constants";

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor, format, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// type BlockFormat = ElementType | TextAlignType | ListType;

// export const toggleBlock = (
//   editor: CustomEditor,
//   format: BlockFormat
// ): void => {
//   const blockType: "type" | "align" = TEXT_ALIGN_TYPES.includes(
//     format as TextAlignType
//   )
//     ? "align"
//     : "type";
//   const isActive = isBlockActive(editor, format, blockType);
//   const isList = LIST_TYPES.includes(format as ListType);

//   Transforms.unwrapNodes(editor, {
//     match: (n) =>
//       !Editor.isEditor(n) &&
//       SlateElement.isElement(n) &&
//       LIST_TYPES.includes(n.type as ListType) &&
//       !TEXT_ALIGN_TYPES.includes(format as TextAlignType),
//     split: true,
//   });

//   const newProperties: Partial<SlateElement> = TEXT_ALIGN_TYPES.includes(
//     format as TextAlignType
//   )
//     ? { align: isActive ? undefined : (format as TextAlignType) }
//     : {
//         type: (isActive
//           ? "paragraph"
//           : isList
//           ? "list-item"
//           : format) as ElementType,
//       };

//   Transforms.setNodes<SlateElement>(editor, newProperties);

//   if (!isActive && isList) {
//     const block = { type: format as ElementType, children: [] } as SlateElement;
//     Transforms.wrapNodes(editor, block);
//   }
// };

// export const toggleMark = (editor: CustomEditor, format: string): void => {
//   const isActive = isMarkActive(editor, format);

//   if (isActive) {
//     Editor.removeMark(editor, format);
//   } else {
//     Editor.addMark(editor, format, true);
//   }
// };

// export const isBlockActive = (
//   editor: CustomEditor,
//   format: BlockFormat,
//   blockType: "type" | "align"
// ): boolean => {
//   const { selection } = editor;
//   if (!selection) return false;

//   const [match] = Array.from(
//     Editor.nodes(editor, {
//       at: Editor.unhangRange(editor, selection),
//       match: (n) =>
//         !Editor.isEditor(n) &&
//         SlateElement.isElement(n) &&
//         ((blockType === "type" && n.type === format) ||
//           (blockType === "align" && "align" in n && n.align === format)),
//     })
//   );

//   return !!match;
// };

// export const isMarkActive = (editor: CustomEditor, format: string): boolean => {
//   const marks = Editor.marks(editor);
//   return marks ? !!marks[format as keyof typeof marks] : false;
// };
