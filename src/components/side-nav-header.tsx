import { ChevronsLeft, FilePlus2, FolderPlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import usePreferences from "../hooks/use-preferences";
import { EntryType } from "../models/entry";

interface Props {
  setState: Dispatch<SetStateAction<{ state: boolean; type: EntryType }>>;
}

export default function SideNavHeader({ setState }: Props) {
  const { setIsMenuOpen } = usePreferences();

  return (
    <ul className="w-full p-3 px-4 flex flex-row justify-end items-center gap-4 text-gray-400">
      <button
        className="hover:text-gray-800"
        onClick={() => setState({ state: true, type: EntryType.FILE })}
      >
        <FilePlus2 size={16} />
      </button>
      <button
        className="hover:text-gray-800"
        onClick={() => setState({ state: true, type: EntryType.FOLDER })}
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
