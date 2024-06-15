import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Mode } from "../models/mode";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEntryByPath, updateEntry } from "../api/entry";
import Footer from "@/components/footer";

export default function Content() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const filePath = decodeURIComponent(pathname).split("/").slice(2).join("/");
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>(Mode.PREVIEW);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const updateInterval = 10000; // 10 seconds

  const { data: entry, isFetched } = useQuery({
    queryKey: ["entry", filePath],
    queryFn: () => getEntryByPath(filePath),
    enabled: !!filePath,
  });

  console.log(filePath);

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      if (entry) updateEntry({ ...entry, content: input });
    },
  });

  useEffect(() => {
    if (isFetched) {
      if (entry) setInput(entry.content ?? "");
      else navigate("/");
    }
  }, [isFetched, entry]);

  const { rowCount, wordCount } = useMemo(() => {
    const rowPattern = /\n|\r\n?/g;
    const wordPattern = /\S+/g;

    const rowMatches = input.match(rowPattern);
    const wordMatches = input.match(wordPattern);

    const rowCount = rowMatches ? rowMatches.length : 0;
    const wordCount = wordMatches ? wordMatches.length : 0;

    return { rowCount, wordCount };
  }, [input]);

  const html = useMemo(() => {
    return {
      __html: DOMPurify.sanitize(
        marked.parse(input, { async: false }) as string
      ),
    };
  }, [input]);

  const saveContent = useCallback(async () => {
    if (entry?.content !== input) {
      await mutateAsync();
      setLastSaved(new Date());
    }
  }, [entry, mutateAsync]);

  useEffect(() => {
    const intervalId = setInterval(saveContent, updateInterval);
    return () => {
      clearInterval(intervalId);
      // saveContent();
    };
  }, [saveContent, updateInterval]);

  const nextMode = () => {
    setMode((prevMode) =>
      prevMode === Mode.PREVIEW ? Mode.INSERT : Mode.PREVIEW
    );
  };

  const byteSize = (str: string) => new Blob([str]).size;

  return (
    <div className="flex flex-col h-screen w-full mt-4">
      <div className="flex-1 w-full h-full overflow-y-auto pb-6">
        {mode === Mode.INSERT ? (
          <form action="POST" className="h-full">
            <textarea
              draggable={false}
              className="w-full h-full resize-none pt-10 px-6 md:px-20 lg:px-40 xl:px-[425px] outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </form>
        ) : (
          <article
            className="prose mx-auto w-full mt-10 px-6 pb-6 text-card-foreground/80"
            dangerouslySetInnerHTML={html}
          ></article>
        )}
      </div>

      <Footer
        wordCount={wordCount}
        rowCount={rowCount}
        bytes={byteSize(input)}
        lastSaved={lastSaved}
        mode={mode}
        nextMode={nextMode}
      />
    </div>
  );
}
