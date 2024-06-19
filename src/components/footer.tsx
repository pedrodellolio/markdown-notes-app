import useEntries from "@/hooks/use-entries";
import { useMemo } from "react";

export default function Footer() {
  const { current } = useEntries();

  const { rowCount, wordCount, bytes } = useMemo(() => {
    if (!current) return { rowCount: 0, wordCount: 0, bytes: 0 };

    const rowPattern = /\n|\r\n?/g;
    const wordPattern = /\S+/g;

    const rowMatches = current.content?.match(rowPattern);
    const wordMatches = current.content?.match(wordPattern);

    const rowCount = rowMatches ? rowMatches.length : 0;
    const wordCount = wordMatches ? wordMatches.length : 0;

    const bytes = new Blob([current.content ?? ""]).size;
    return { rowCount, wordCount, bytes };
  }, [current]);

  return (
    <footer
      className={`w-full h-6 flex flex-row items-center justify-end gap-4 px-4 font-medium text-muted-foreground text-xs bg-secondary`}
    >
      <p>{wordCount} words</p>
      <p>{rowCount} lines</p>
      <p>{bytes} bytes</p>
      {/* {props.lastSaved && (
        <p>Last saved at {props.lastSaved.toLocaleTimeString()}</p>
      )} */}
    </footer>
  );
}
