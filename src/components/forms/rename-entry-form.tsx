import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntry } from "../../api/entry";
import { File, Folder } from "lucide-react";
import useEntries from "@/hooks/use-entries";
import { EntryType } from "@/models/entry";

interface Props {
  type: EntryType;
}

export default function RenameEntryForm({ type }: Props) {
  const { renaming, setRenaming } = useEntries();
  const queryClient = useQueryClient();
  const [newEntryName, setNewEntryName] = useState(
    renaming ? renaming.name : ""
  );

  const { mutateAsync: updateAsync } = useMutation({
    mutationFn: updateEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.form?.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  const handleRenamingEntry = () => {
    if (renaming) {
      updateAsync({ ...renaming, name: newEntryName });
      setRenaming(undefined);
    }
  };

  const handleBlur = () => {
    if (newEntryName !== "") handleRenamingEntry();
    else setRenaming(undefined);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRenamingEntry();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center gap-2 text-gray-600 mb-1 ml-[38px]"
    >
      {type === EntryType.FILE ? (
        <File size={18} className="mt-1" />
      ) : (
        <Folder size={18} className="mt-1" />
      )}
      <input
        autoFocus
        type="text"
        autoComplete="off"
        name="entryName"
        value={newEntryName}
        onChange={(e) => setNewEntryName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={(e) => e.target.select()}
        className="w-full h-6"
      />
    </form>
  );
}
