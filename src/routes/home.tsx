import DOMPurify from "dompurify";
import { marked } from "marked";
import { useMemo, useState } from "react";

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

export default function Home() {
  const [input, setInput] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const html = useMemo(() => {
    return {
      __html: DOMPurify.sanitize(
        marked.parse(input, { async: false }) as string
      ),
    };
  }, [input]);

  return (
    <div className="flex flex-col h-screen py-6">
      <ul className="fixed top-0 left-0 right-0 py-4 px-6 mx-auto flex flex-row items-center gap-4 font-medium text-gray-400 text-sm bg-white z-10">
        <li>
          <button
            className={`${isEditing && "text-gray-800"}`}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </li>
        <li>
          <button
            className={`${!isEditing && "text-gray-800"}`}
            onClick={() => setIsEditing(false)}
          >
            Preview
          </button>
        </li>
      </ul>

      <div className="flex-1 w-full h-full">
        {isEditing ? (
          <form action="POST" className="h-full">
            <textarea
              draggable={false}
              className="w-full h-full resize-none pt-10 px-6 md:px-20 lg:px-40 xl:px-[610px] outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </form>
        ) : (
          <article
            className="prose max-w-none w-full mx-auto mt-10 px-6 md:px-20 lg:px-40 xl:px-[610px]"
            dangerouslySetInnerHTML={html}
          ></article>
        )}
      </div>
    </div>
  );
}
