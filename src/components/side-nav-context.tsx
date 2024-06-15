import { deleteEntry } from "@/api/entry";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useEntries from "@/hooks/use-entries";
import usePreferences from "@/hooks/use-preferences";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import RenameEntryForm from "./forms/rename-entry-form";
import { EntryType } from "@/models/entry";

interface Props {
  children: ReactNode;
}

export function SideNavContext({ children }: Props) {
  const queryClient = useQueryClient();
  const { selected, setCreating } = useEntries();
  const { setIsContextOpen } = usePreferences();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async () => selected && deleteEntry(selected),
    onSuccess: () => {
      if (pathname === `/file/${selected?.id}`) navigate("/");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const handleDeleteEntry = () => {
    mutateAsync();
  };

  return (
    <Dialog>
      <ContextMenu onOpenChange={setIsContextOpen}>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {selected?.type === EntryType.FOLDER && (
            <>
              <ContextMenuItem
                inset
                onClick={() =>
                  setCreating({
                    type: EntryType.FILE,
                    folderId: selected.id,
                  })
                }
              >
                New File...
              </ContextMenuItem>
              <ContextMenuItem
                inset
                onClick={() =>
                  setCreating({
                    type: EntryType.FOLDER,
                    folderId: selected.id,
                  })
                }
              >
                New Folder...
              </ContextMenuItem>
              <ContextMenuSeparator />
            </>
          )}
          <ContextMenuItem
            inset
            onClick={() => navigate(`file/${selected?.id}`)}
          >
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
          <DialogTrigger asChild>
            <ContextMenuItem inset>Rename</ContextMenuItem>
          </DialogTrigger>
          <ContextMenuItem inset onClick={handleDeleteEntry}>
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Renaming {selected?.type === EntryType.FILE ? "file" : "folder"}
          </DialogTitle>
        </DialogHeader>
        <RenameEntryForm />
      </DialogContent>
    </Dialog>
  );
}
