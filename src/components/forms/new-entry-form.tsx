import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry } from "../../api/entry";
import { Folder, File } from "lucide-react";
import useEntries from "@/hooks/use-entries";
import usePreferences from "@/hooks/use-preferences";
import { EntryType } from "@/models/entry";

export default function NewEntryForm() {
  const { selected, creating, setCreating } = useEntries();
  const { isContextOpen } = usePreferences();

  const queryClient = useQueryClient();
  const [newEntryName, setNewEntryName] = useState("");

  const { mutateAsync: createAsync } = useMutation({
    mutationFn: createEntry,
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

  const handleCreateEntry = () => {
    if (creating) {
      createAsync({
        name: newEntryName,
        type: creating.type,
        parentId: selected?.type === EntryType.FOLDER ? selected.id : undefined,
      });
      setCreating(undefined);
      setNewEntryName("");
    }
  };

  const handleBlur = () => {
    if (!isContextOpen) {
      if (newEntryName !== "") handleCreateEntry();
      else {
        setCreating(undefined);
        setNewEntryName("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateEntry();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center gap-2 mb-2 pl-4"
    >
      {creating?.type === EntryType.FILE ? (
        <File size={18} className="mt-1" />
      ) : (
        <Folder size={18} className="mt-1" />
      )}
      <input
        autoFocus
        name="entryName"
        value={newEntryName}
        onChange={(e) => setNewEntryName(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoComplete="off"
        className="w-full mt-1 h-5 border border-1 border-gray-200"
      />
    </form>
  );
}
