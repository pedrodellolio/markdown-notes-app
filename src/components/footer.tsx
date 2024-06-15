import { Mode } from "@/models/mode";

interface Props {
  wordCount: number;
  rowCount: number;
  bytes: number;
  lastSaved: Date | null;
  mode: Mode;
  nextMode: () => void;
}

export default function Footer({
  wordCount,
  rowCount,
  bytes,
  lastSaved,
  mode,
  nextMode,
}: Props) {
  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 py-1 px-6 mx-auto flex flex-row items-center justify-end gap-4 font-medium text-muted-foreground text-xs bg-secondary z-10`}
    >
      <button onClick={nextMode}>{Mode[mode]}</button>
      <p>{wordCount} words</p>
      <p>{rowCount} lines</p>
      <p>{bytes} bytes</p>
      {lastSaved && <p>Last saved at {lastSaved.toLocaleTimeString()}</p>}
    </footer>
  );
}
