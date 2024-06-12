import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Mode } from "../models/mode";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFileById, updateEntry } from "../api/entry";

export default function Content() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const fileId = pathname.split("/")[2];

  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>(Mode.PREVIEW);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const updateInterval = 10000; // 10 seconds

  const { data: entry, isFetched } = useQuery({
    queryKey: ["entry", fileId],
    queryFn: () => getFileById(fileId),
    enabled: !!fileId,
  });

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
            className="prose mx-auto w-full mt-10 px-6 pb-6"
            dangerouslySetInnerHTML={html}
          ></article>
        )}
      </div>

      <footer
        className={`fixed bottom-0 left-0 right-0 py-1 px-6 mx-auto flex flex-row items-center justify-end gap-4 font-medium text-gray-500 text-xs bg-gray-200 z-10`}
      >
        <button onClick={nextMode}>{Mode[mode]}</button>
        <p>{wordCount} words</p>
        <p>{rowCount} lines</p>
        <p>{byteSize(input)} bytes</p>
        {lastSaved && <p>Last saved at {lastSaved.toLocaleTimeString()}</p>}
      </footer>
    </div>
  );
}
