import EditorPlaceholder from "@/components/editor-placeholder";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

export default function Index() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={50} minSize={20}>
        <EditorPlaceholder />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50} minSize={20}>
        <div className="p-6 max-w-none prose prose-md text-card-foreground/80 dark:prose-invert bg-muted/50 break-words h-full overflow-y-auto overflow-x-hidden"></div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
