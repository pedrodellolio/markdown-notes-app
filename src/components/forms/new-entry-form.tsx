import { useState, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EntryType } from "../../models/entry";
import { createEntry } from "../../api/entry";
import { Folder, File } from "lucide-react";

interface Props {
  isCreatingEntry: { state: boolean; type: EntryType };
  setState: Dispatch<SetStateAction<{ state: boolean; type: EntryType }>>;
}

export default function NewEntryForm({ isCreatingEntry, setState }: Props) {
  const queryClient = useQueryClient();
  const [newEntryName, setNewEntryName] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: createEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      e.currentTarget.form?.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
    }
  };

  const handleCreateEntry = () => {
    mutateAsync({ name: newEntryName, type: isCreatingEntry.type });
    setState({ state: false, type: EntryType.FILE });
    setNewEntryName("");
  };

  const handleBlur = () => {
    if (newEntryName != "") handleCreateEntry();
    else {
      setState({ state: false, type: EntryType.FILE });
      setNewEntryName("");
    }
  };
  return (
    <form
      onSubmit={handleCreateEntry}
      className="flex flex-row items-center gap-2 text-gray-600 mb-1 ml-[38px]"
    >
      {isCreatingEntry.type === EntryType.FILE ? (
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
