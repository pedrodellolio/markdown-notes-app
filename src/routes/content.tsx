import DOMPurify from "dompurify";
import { marked } from "marked";
import { useMemo, useState } from "react";
import { Mode } from "../models/mode";
import { getFileById } from "../api/file";
import { File } from "../models/file";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }: any) {
  const file = await getFileById(params.id);
  return { file };
}

export default function Content() {
  const { file } = useLoaderData() as { file: File };

  const [input, setInput] = useState(file.content);
  const [mode, setMode] = useState<Mode>(Mode.PREVIEW);

  const { rowCount } = useMemo(() => {
    const rowPattern = /\n|\r\n?/g;
    const matches = input.match(rowPattern);
    const rowCount = matches ? matches.length : 0;
    return { rowCount };
  }, [input]);

  const { wordCount } = useMemo(() => {
    const wordPattern = /\S+/g;
    const matches = input.match(wordPattern);
    const wordCount = matches ? matches.length : 0;
    return { wordCount };
  }, [input]);

  const html = useMemo(() => {
    return {
      __html: DOMPurify.sanitize(
        marked.parse(input, { async: false }) as string
      ),
    };
  }, [input]);

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
      </footer>
    </div>
  );
}
