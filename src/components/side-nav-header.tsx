import { ChevronsLeft, FilePlus2, FolderPlus } from "lucide-react";
import usePreferences from "../hooks/use-preferences";
import useEntries from "@/hooks/use-entries";
import { EntryType } from "@/models/entry";

export default function SideNavHeader() {
  const { setIsMenuOpen } = usePreferences();
  const { selected, setCreating } = useEntries();

  return (
    <ul className="w-full p-3 px-4 flex flex-row justify-end items-center gap-4 text-gray-400">
      <button
        className="hover:text-gray-800"
        onClick={() =>
          setCreating({
            type: EntryType.FILE,
            folderId:
              selected?.type === EntryType.FOLDER ? selected.id : undefined,
          })
        }
      >
        <FilePlus2 size={16} />
      </button>
      <button
        className="hover:text-gray-800"
        onClick={() =>
          setCreating({
            type: EntryType.FOLDER,
            folderId:
              selected?.type === EntryType.FOLDER ? selected.id : undefined,
          })
        }
      >
        <FolderPlus size={16} />
      </button>
      <button
        className="hover:text-gray-800"
        onClick={() => setIsMenuOpen(false)}
      >
        <ChevronsLeft size={22} />
      </button>
    </ul>
  );
}
