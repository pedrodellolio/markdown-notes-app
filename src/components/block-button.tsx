import { useSlate } from "slate-react";
import { Button } from "./ui/button";
import { isBlockActive, toggleBlock } from "@/lib/slate/actions";
import { TEXT_ALIGN_TYPES } from "@/lib/slate/constants";
import { ReactNode } from "react";

export const BlockButton = ({
  format,
  icon,
}: {
  format: string;
  icon: ReactNode;
}) => {
  const editor = useSlate();
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  return (
    <Button
      className={isActive ? "text-blue-500" : "text-black"}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

// import { isBlockActive, toggleBlock } from "@/lib/slate/actions";
// import { BlockFormat, TEXT_ALIGN_TYPES } from "@/lib/slate/constants";
// import { Button } from "./ui/button";
// import { useSlate } from "slate-react";
// import { TextAlignType } from "@/lib/slate/types";
// import { ReactNode } from "react";

// interface Props {
//   format: BlockFormat | TextAlignType;
//   icon: ReactNode;
// }

// export default function BlockButton({ format, icon }: Props) {
//   const editor = useSlate();
//   const isTextAlignType =
//     typeof format === "string" &&
//     TEXT_ALIGN_TYPES.includes(format as TextAlignType);
//   const isActive = isBlockActive(
//     editor,
//     format,
//     isTextAlignType ? "align" : "type"
//   );
//   return (
//     <Button
//       className={isActive ? "text-blue-500": "text-black"}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         toggleBlock(editor, format);
//       }}
//     >
//       {icon}
//     </Button>
//   );
// }
