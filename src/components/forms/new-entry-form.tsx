import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EntryType } from "../../models/entry";
import { createEntry } from "../../api/entry";
import { Folder, File } from "lucide-react";
import useEntries from "@/hooks/use-entries";

export default function NewEntryForm() {
  const { isCreating, setIsCreating } = useEntries();
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
    createAsync({ name: newEntryName, type: isCreating.type });
    setIsCreating({ state: false, type: EntryType.FILE });
    setNewEntryName("");
  };

  const handleBlur = () => {
    if (newEntryName !== "") handleCreateEntry();
    else {
      setIsCreating({ state: false, type: EntryType.FILE });
      setNewEntryName("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateEntry();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center gap-2 text-gray-600 mb-1 ml-[38px]"
    >
      {isCreating.type === EntryType.FILE ? (
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
        className="w-full mt-1"
      />
    </form>
  );
}
