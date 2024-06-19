import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
// import MarkdownEditor from "@/components/markdown-editor";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { getEntryByName, getEntryByPath } from "@/api/entry";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import useEntries from "@/hooks/use-entries";
import MarkdownEditor from "@/components/markdown-editor";

export default function Content() {
  const { setCurrent } = useEntries();
  const { pathname } = useLocation();
  const filePath = decodeURIComponent(pathname).split("/").slice(2).join("/");
  const [input, setInput] = useState<string>("");

  const { data: entry } = useQuery({
    queryKey: ["entry", filePath],
    queryFn: async () => {
      const entry = await getEntryByPath(filePath);
      if (!entry) return await getEntryByName("Getting Started");
      entry.content && setInput(entry.content);
      setCurrent(entry);
      return entry;
    },
  });

  const html = useMemo(() => {
    return {
      __html: DOMPurify.sanitize(
        marked.parse(input, { breaks: true }) as string
      ),
    };
  }, [input]);

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={50} minSize={20}>
        {entry && (
          <MarkdownEditor entry={entry} input={input} setInput={setInput} />
        )}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={20}>
        <div
          className="p-6 max-w-none prose prose-md text-card-foreground/80 dark:prose-invert bg-muted/80 break-words h-full overflow-y-scroll overflow-x-hidden"
          dangerouslySetInnerHTML={html}
        ></div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
