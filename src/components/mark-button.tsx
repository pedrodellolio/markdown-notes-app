import { isMarkActive, toggleMark } from "@/lib/slate/actions";
import { ReactNode } from "react";
import { useSlate } from "slate-react";
import { Button } from "./ui/button";

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: ReactNode;
}) => {
  const editor = useSlate();
  return (
    <Button
      className={isMarkActive(editor, format) ? "text-blue-500" : "text-black"}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

// import { isMarkActive, toggleMark } from "@/lib/slate/actions";
// import { MarkFormat } from "@/lib/slate/constants";
// import { Button } from "./ui/button";
// import { useSlate } from "slate-react";
// import { ReactNode } from "react";

// interface Props {
//   format: MarkFormat;
//   icon: ReactNode;
// }

// export default function MarkButton({ format, icon }: Props) {
//   const editor = useSlate();
//   return (
//     <Button
//       className={isMarkActive(editor, format) ? "text-blue-500" : "text-black"}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         toggleMark(editor, format);
//       }}
//     >
//       {icon}
//     </Button>
//   );
// }
