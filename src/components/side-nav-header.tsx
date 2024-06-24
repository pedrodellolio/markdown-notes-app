import {
  ChevronsLeft,
  ChevronsRight,
  FilePlus2,
  FolderPlus,
} from "lucide-react";
import usePreferences from "../hooks/use-preferences";
import useEntries from "@/hooks/use-entries";
import { EntryType } from "@/models/entry";

export default function SideNavHeader() {
  const { isMenuOpen, setIsMenuOpen } = usePreferences();
  const { selected, setCreating } = useEntries();

  return (
    <ul className="w-full p-3 px-4 flex flex-row justify-end items-center gap-5 text-muted-foreground/65">
      <button
        className="hover:text-muted-foreground"
        onClick={() =>
          setCreating({
            type: EntryType.FILE,
            folderId:
              selected?.type === EntryType.FOLDER ? selected.id : undefined,
          })
        }
      >
        <FilePlus2 size={17} />
      </button>
      <button
        className="hover:text-muted-foreground"
        onClick={() =>
          setCreating({
            type: EntryType.FOLDER,
            folderId:
              selected?.type === EntryType.FOLDER ? selected.id : undefined,
          })
        }
      >
        <FolderPlus size={17} />
      </button>
      <button
        className="hover:text-muted-foreground"
        onClick={() => setIsMenuOpen((prevState) => !prevState)}
      >
        {isMenuOpen ? <ChevronsLeft size={22} /> : <ChevronsRight size={22} />}
      </button>
    </ul>
  );
}
