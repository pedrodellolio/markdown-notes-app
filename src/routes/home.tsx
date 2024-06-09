import DOMPurify from "dompurify";
import { marked } from "marked";
import { useMemo, useState } from "react";
import usePreferences from "../hooks/use-preferences";

const text = `Marked - Markdown Parser
========================

[Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

How To Use The Demo
-------------------

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option above to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.

Why Markdown?
-------------

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

Ready to start writing?  Either start changing stuff on the left or
[clear everything](/demo/?text=) with a simple click.

[Marked]: https://github.com/markedjs/marked/
[Markdown]: http://daringfireball.net/projects/markdown/
`;

enum Mode {
  PREVIEW,
  INSERT,
}

export default function Home() {
  const { isMenuOpen } = usePreferences();
  const [input, setInput] = useState(text);
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
        className={`fixed bottom-0 ${
          isMenuOpen ? "left-60" : "left-0"
        } right-0 py-1 px-6 mx-auto flex flex-row items-center gap-4 font-medium text-gray-500 text-xs bg-gray-200 z-10`}
      >
        <button onClick={nextMode}>{Mode[mode]}</button>
        <p>{wordCount} words</p>
        <p>{rowCount} lines</p>
        <p>{byteSize(input)} bytes</p>
      </footer>
    </div>
  );
}
