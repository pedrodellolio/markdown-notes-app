import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import MarkdownEditor from "@/components/markdown-editor";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { getEntryByName, getEntryByPath } from "@/api/entry";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import useEntries from "@/hooks/use-entries";

export default function Content() {
  const { setCurrent } = useEntries();
  const { pathname } = useLocation();
  const filePath = decodeURIComponent(pathname).split("/").slice(2).join("/");

  const [input, setInput] = useState<string>("");

  const { data: entry, isLoading } = useQuery({
    queryKey: ["entry", filePath],
    queryFn: async () => {
      const entry = await getEntryByPath(filePath);
      if (!entry) {
        return await getEntryByName("Getting Started");
      }
      setCurrent(entry);
      setInput(entry.content ?? "");
      return entry;
    },
    enabled: !!filePath,
  });

  const html = useMemo(() => {
    return {
      __html: DOMPurify.sanitize(
        marked.parse(input, { breaks: true }) as string
      ),
    };
  }, [input]);

  if (isLoading) return <p>Loading...</p>;
  else
    return (
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50} minSize={20}>
          <MarkdownEditor entry={entry} input={input} setInput={setInput} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50} minSize={20}>
          <div
            className="px-6 py-4 max-w-none prose prose-md text-card-foreground/80 dark:prose-invert bg-muted/80 break-words h-full overflow-y-scroll overflow-x-hidden"
            dangerouslySetInnerHTML={html}
          ></div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
}
