import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEntry } from "../../api/entry";
import useEntries from "@/hooks/use-entries";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DialogClose } from "../ui/dialog";

export default function RenameEntryForm() {
  const queryClient = useQueryClient();
  const { selected } = useEntries();
  const [newEntryName, setNewEntryName] = useState(selected?.name ?? "");

  const { mutateAsync: updateAsync } = useMutation({
    mutationFn: updateEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selected) updateAsync({ ...selected, name: newEntryName });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center gap-2 text-gray-600"
    >
      <Input
        autoFocus
        autoComplete="off"
        type="text"
        name="entryName"
        value={newEntryName}
        onChange={(e) => setNewEntryName(e.target.value)}
        onFocus={(e) => e.target.select()}
      />

      <DialogClose asChild>
        <Button type="submit">Rename</Button>
      </DialogClose>
    </form>
  );
}
