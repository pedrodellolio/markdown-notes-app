import { useBeforeUnload, useParams } from "react-router-dom";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { getEntryById, updateEntry } from "@/api/entry";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import useEntries from "@/hooks/use-entries";
import MarkdownEditor from "@/components/markdown-editor";
import EditorPlaceholder from "@/components/editor-placeholder";

export const entryContentQuery = (id: string) => ({
  queryKey: ["entry", id],
  queryFn: async () => getEntryById(id),
});

export const loader =
  (qc: QueryClient) =>
  async ({ params }: any) => {
    const query = entryContentQuery(params.contactId);
    return qc.getQueryData(query.queryKey) ?? (await qc.fetchQuery(query));
  };

export default function Content() {
  const params = useParams() as any;
  const { setCurrent, setLastSaved } = useEntries();
  const { data: entry } = useQuery(entryContentQuery(params.entryId));
  const { mutateAsync } = useMutation({
    mutationFn: async (value: string) =>
      entry && updateEntry({ ...entry, content: value }),
    onSuccess: () => setLastSaved(new Date()),
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    if (entry) {
      setCurrent(entry);
      setInput(entry.content ?? "");
    }
  }, [entry, setCurrent]);

  useBeforeUnload(
    useCallback(() => {
      if (entry && input !== entry.content) mutateAsync(input);
    }, [entry, input, mutateAsync])
  );

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
        {entry ? (
          <MarkdownEditor input={input} setInput={setInput} />
        ) : (
          <EditorPlaceholder />
        )}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={20}>
        <div
          className="p-6 max-w-none prose prose-md text-card-foreground/80 dark:prose-invert bg-muted/50 break-words h-full overflow-y-auto overflow-x-hidden"
          dangerouslySetInnerHTML={html}
        ></div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
