import useEntries from "@/hooks/use-entries";
import { useMemo } from "react";
import { NavBreadcrumb } from "./nav-breadcrumb";

export default function Footer() {
  const { current, lastSaved } = useEntries();

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
      className={`w-full h-8 flex flex-row items-center justify-between px-4 pt-1 font-medium text-muted-foreground text-xs bg-secondary`}
    >
      <NavBreadcrumb />
      <div className="flex flex-row items-center justify-end gap-4 w-full">
        {lastSaved && <p>Last saved at {lastSaved.toLocaleTimeString()}</p>}
        <p>{wordCount} words</p>
        <p>{rowCount} lines</p>
        <p>{bytes} bytes</p>
      </div>
    </footer>
  );
}
