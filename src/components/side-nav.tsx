import { ChevronRight, Folder, File } from "lucide-react";
import usePreferences from "../hooks/use-preferences";
import { Link, useLocation } from "react-router-dom";
import { EntryType } from "../models/entry";
import NewEntryForm from "./forms/new-entry-form";
import SideNavHeader from "./side-nav-header";
import { useQuery } from "@tanstack/react-query";
import { getEntries } from "../api/entry";
import useEntries from "@/hooks/use-entries";
import RenameEntryForm from "./forms/rename-entry-form";
import { SideNavContext } from "./side-nav-context";

export default function SideNav() {
  const { isMenuOpen } = usePreferences();
  const {
    selected,
    renaming,
    isCreating,
    setSelected,
    setIsCreating,
    setRenaming,
  } = useEntries();
  const location = useLocation();
  const currentFileId = location.pathname.split("/").pop();

  const { data: entries } = useQuery({
    queryKey: ["entries"],
    queryFn: getEntries,
  });

  const handleBlur = () => {
    setSelected(undefined);
    setRenaming(undefined);
  };

  return (
    <>
      <aside
        className={`fixed h-screen w-64 bg-white border border-r ${
          !isMenuOpen && "hidden"
        }`}
      >
        <SideNavHeader setState={setIsCreating} />
        <ul className="pt-2">
          {isCreating.state && <NewEntryForm />}
          {entries?.map((e) => {
            const isSelected = e === selected;
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
                onFocus={() => setSelected(e)}
                onBlur={handleBlur}
                key={e.id}
              >
                {e === renaming ? (
                  <RenameEntryForm type={e.type} />
                ) : (
                  <SideNavContext>
                    {e.type === EntryType.FILE ? (
                      <Link
                        className="flex flex-row items-center gap-2 px-4 ml-[22px]"
                        to={`file/${e.id}`}
                      >
                        <File size={16} className="mt-1" />
                        <div className="flex flex-row items-center w-44">
                          <p className="truncate">{e.name}</p>
                          <span className={`text-gray-400`}>.md</span>
                        </div>
                      </Link>
                    ) : (
                      <p className="flex flex-row items-center gap-2 px-4">
                        <ChevronRight size={14} />
                        <Folder size={16} className="mt-[2px]" />
                        <span className="truncate w-44">{e.name}</span>
                      </p>
                    )}
                  </SideNavContext>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
