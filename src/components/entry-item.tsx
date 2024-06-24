import useEntries from "@/hooks/use-entries";
import { Entry, EntryType } from "@/models/entry";
import { Folder, File, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SideNavContext } from "./side-nav-context";
import NewEntryForm from "./forms/new-entry-form";
import { useQuery } from "@tanstack/react-query";
import { getEntryChildren } from "@/api/entry";

interface EntryItemProps {
  entry: Entry;
}

function EntryItem({ entry }: EntryItemProps) {
  const { selected, creating, setCreating, setSelected, setRenaming } =
    useEntries();
  const isSelected = selected?.id === entry.id;

  const [isOpen, setIsOpen] = useState(false);

  const { data: children } = useQuery({
    queryKey: ["entries", entry.id],
    queryFn: () => getEntryChildren(entry.id),
    enabled: entry.type === EntryType.FOLDER && isOpen,
  });

  useEffect(() => {
    if (isSelected && creating) {
      setIsOpen(true);
    }
  }, [isSelected, creating]);

  const handleClick = () => {
    setSelected(entry);
    setCreating(undefined);
    setRenaming(undefined);
  };

  const toggleFolder = () => {
    if (entry.type === EntryType.FOLDER) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <SideNavContext>
      <li className="select-none">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleFolder}
        >
          <div
            className={`relative flex flex-row items-center gap-2 w-full pl-3 py-1 ${
              isSelected
                ? "bg-secondary border border-1 border-secondary-foreground/15"
                : "hover:bg-secondary-foreground/5"
            }`}
          >
            {entry.type === EntryType.FOLDER ? (
              <div className="flex flex-row items-center gap-2 w-full">
                <div className="absolute left-0 pl-2">
                  {isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </div>
                <div className="flex flex-row items-center gap-2 w-full">
                  <Folder size={16} className="ml-4" />
                  <div
                    onClick={handleClick}
                    onContextMenu={handleClick}
                    className="w-48 text-card-foreground/80 truncate"
                  >
                    {entry.name}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-2 w-full">
                <File size={16} className="ml-4" />
                <Link
                  to={`/${entry.id}`}
                  onClick={handleClick}
                  onContextMenu={handleClick}
                  className="w-48 flex flex-row items-center"
                >
                  <div className="text-card-foreground/80 truncate">
                    {entry.name}
                  </div>
                  <div className="text-card-foreground/80">.md</div>
                </Link>
              </div>
            )}
          </div>
        </div>
        {entry.type === EntryType.FOLDER && isOpen && (
          <ul className="pl-4">
            {children?.map((child) => (
              <EntryItem key={child.id} entry={child} />
            ))}
            {isSelected && creating && <NewEntryForm />}
          </ul>
        )}
      </li>
    </SideNavContext>
  );
}

export default EntryItem;
