import { deleteEntry } from "@/api/entry";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useEntries from "@/hooks/use-entries";
import { EntryType } from "@/models/entry";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export function SideNavContext({ children }: Props) {
  const queryClient = useQueryClient();
  const { selected, setRenaming, setIsCreating } = useEntries();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      if (selected) deleteEntry(selected.id);
    },
    onSuccess: () => {
      if (pathname === `/file/${selected?.id}`) navigate("/");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const handleDeleteEntry = () => {
    mutateAsync();
  };

  const handleRenameEntry = () => {
    if (selected) setRenaming(selected);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => navigate(`file/${selected?.id}`)}>
          Open
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={() =>
            window.open(
              `${window.location.origin}/file/${selected?.id}`,
              "_blank"
            )
          }
        >
          Open in New Tab
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          inset
          onClick={() => setIsCreating({ state: true, type: EntryType.FILE })}
        >
          New File
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={() => setIsCreating({ state: true, type: EntryType.FOLDER })}
        >
          New Folder
        </ContextMenuItem>
        {selected && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem inset onClick={handleRenameEntry}>
              Rename
            </ContextMenuItem>
            <ContextMenuItem inset onClick={handleDeleteEntry}>
              Delete
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
