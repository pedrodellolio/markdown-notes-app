import { Heading1, Heading2 } from "lucide-react";
import { MarkButton } from "./mark-button";
import { BlockButton } from "./block-button";

function Toolbar() {
  return (
    <div className="flex flex-row items-center gap-4 pb-8">
      <MarkButton format="bold" icon="format_bold" />
      <MarkButton format="italic" icon="format_italic" />
      <MarkButton format="underline" icon="format_underlined" />
      <MarkButton format="code" icon="code" />
      <BlockButton format="heading-one" icon={<Heading1 />} />
      <BlockButton format="heading-two" icon={<Heading2 />} />

      {/* <Button
        className="bg-transparent text-muted-foreground hover:text-blue-500 hover:bg-transparent"
        onClick={() => applyFormat("bold")}
      >
        <strong>B</strong>
      </Button>
      <Button
        className="bg-transparent text-muted-foreground hover:text-blue-500 hover:bg-transparent"
        onClick={() => applyFormat("italic")}
      >
        <em>I</em>
      </Button>
      <Button
        className="bg-transparent text-muted-foreground hover:text-blue-500 hover:bg-transparent"
        onClick={() => applyFormat("heading1")}
      >
        H1
      </Button>
      <Button
        className="bg-transparent text-muted-foreground hover:text-blue-500 hover:bg-transparent"
        onClick={() => applyFormat("heading2")}
      >
        H2
      </Button>
      <Button
        className="bg-transparent text-muted-foreground hover:text-blue-500 hover:bg-transparent"
        onClick={() => applyFormat("heading3")}
      >
        H3
      </Button>
      <Button
        className="bg-transparent text-muted-foreground hover:text-blue-500 hover:bg-transparent"
        onClick={() => applyFormat("list")}
      >
        List
      </Button>
      <Button
        className="bg-transparent text-muted-foreground hover:text-blue-500 hover:bg-transparent"
        onClick={() => applyFormat("quote")}
      >
        Quote
      </Button>
      <Button
        className="bg-transparent text-muted-foreground hover:text-blue-500 hover:bg-transparent"
        onClick={() => applyFormat("code")}
      >
        Code
      </Button> */}
    </div>
  );
}

export default Toolbar;
