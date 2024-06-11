import { ChevronRight, Folder, File } from "lucide-react";
import usePreferences from "../hooks/use-preferences";
import { Link, useLocation } from "react-router-dom";
import { Entry, EntryType } from "../models/entry";
import NewEntryForm from "./forms/new-entry-form";
import { useEffect, useRef, useState } from "react";
import SideNavHeader from "./side-nav-header";
import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../api/entry";
import { SideNavContext } from "./side-nav-context";

export default function SideNav() {
  const { isMenuOpen } = usePreferences();
  const [selectedEntry, setSelectedEntry] = useState<Entry>();
  const [isCreatingEntry, setIsCreatingEntry] = useState({
    state: false,
    type: EntryType.FILE,
  });

  const asideRef = useRef<HTMLDivElement>(null);

  const { data: entries } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });

  const location = useLocation();
  const currentFileId = location.pathname.split("/").pop();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        setSelectedEntry(undefined);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [asideRef]);

  return (
    <SideNavContext>
      <aside
        ref={asideRef}
        className={`fixed h-screen w-64 bg-white border border-r ${
          !isMenuOpen && "hidden"
        }`}
      >
        <SideNavHeader setState={setIsCreatingEntry} />
        <ul className="pt-2">
          {isCreatingEntry.state && (
            <NewEntryForm
              isCreatingEntry={isCreatingEntry}
              setState={setIsCreatingEntry}
            />
          )}
          {entries?.map((e) => {
            const isSelected = e === selectedEntry;
            const isCurrentFile =
              e.type === EntryType.FILE && e.id === currentFileId;

            return (
              <li
                className={`text-gray-600 cursor-pointer ${
                  isSelected && "outline outline-1 outline-gray-300"
                } ${
                  isCurrentFile
                    ? "bg-gray-100 text-blue-800"
                    : "hover:text-gray-800 hover:bg-gray-100"
                } py-[3px]`}
                onClick={() => setSelectedEntry(e)}
                key={e.id}
              >
                {e.type === EntryType.FILE ? (
                  <Link
                    className="flex flex-row items-center gap-2 px-4 ml-[22px]"
                    to={`file/${e.id}`}
                  >
                    <File size={16} className="mt-1" />
                    <p>
                      {e.name}
                      <span className={`text-gray-400`}>.md</span>
                    </p>
                  </Link>
                ) : (
                  <p className="flex flex-row items-center gap-2 px-4">
                    <ChevronRight size={14} />
                    <Folder size={16} className="mt-[2px]" />
                    {e.name}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
    </SideNavContext>
  );
}
