export default function EditorPlaceholder() {
  return (
    <div className="bg-editor h-full w-full flex justify-center items-center">
      <ul className="list-decimal leading-10 text-muted-foreground">
        <li>
          <span className="flex flex-row items-center gap-2">
            Create a new file
            <span className="flex flex-row items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs text-center">alt</span>
              </kbd>
              <p>+</p>
              <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs text-center">N</span>
              </kbd>
            </span>
          </span>
        </li>
        <li>Start writing!</li>
      </ul>
    </div>
  );
}
