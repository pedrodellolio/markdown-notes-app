import { Button } from "./ui/button";

function Toolbar() {  
  const applyFormat = (format: string) => {
    return format;
  };
  return (
    <div className="flex flex-row justify-center items-center gap-4 bg-editor">
      <Button
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
      </Button>
    </div>
  );
}

export default Toolbar;
