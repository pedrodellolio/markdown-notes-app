export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];
export const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

// export type MarkFormat = "bold" | "italic" | "underline" | "code";
// export type BlockFormat =
//   | "heading"
//   | "heading-two"
//   | "block-quote"
//   // | "numbered-list"
//   | "bulleted-list"
//   // | "left"
//   // | "center"
//   // | "right"
//   // | "justify"
//   | "paragraph"
//   | "image"
//   | "link"
//   | "button"
//   | "badge"
//   | "list-item"
//   | "mention"
//   | "table"
//   | "table-row"
//   | "table-cell"
//   | "title"
//   | "video"
//   | "code-block"
//   | "code-line";

// export const HOTKEYS: Record<string, MarkFormat> = {
//   "ctrl+b": "bold",
//   "ctrl+i": "italic",
//   "ctrl+u": "underline",
//   "ctrl+`": "code",
// };

// export const LIST_TYPES = ["numbered-list", "bulleted-list"] as const;
// export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"] as const;
// export const ELEMENT_TYPES = [
//   "block-quote",
//   "bulleted-list",
//   "check-list-item",
//   "editable-void",
//   "heading",
//   "heading-two",
//   "image",
//   "link",
//   "button",
//   "badge",
//   "list-item",
//   "mention",
//   "paragraph",
//   "table",
//   "table-cell",
//   "table-row",
//   "title",
//   "video",
//   "code-block",
//   "code-line",
// ] as const;

// export type ElementType = (typeof ELEMENT_TYPES)[number];
// export type ListType = "bulleted-list" | "numbered-list";
// export type TextAlignType = "left" | "center" | "right" | "justify";
