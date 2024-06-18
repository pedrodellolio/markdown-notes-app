import useEntries from "@/hooks/use-entries";
import { Entry, EntryType } from "@/models/entry";
import { Folder, File, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SideNavContext } from "./side-nav-context";
import NewEntryForm from "./forms/new-entry-form";
import { useQuery } from "@tanstack/react-query";
import { getEntryChildren, getPath } from "@/api/entry";

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

  const { data: path } = useQuery({
    queryKey: ["path", entry.id],
    queryFn: () => getPath(entry),
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
      <li>
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleFolder}
        >
          <div
            className={`flex flex-row items-center gap-2 w-full pl-4 ${
              isSelected
                ? "bg-secondary border border-1 border-secondary-foreground/15"
                : "hover:bg-secondary-foreground/5  "
            }`}
          >
            {entry.type === EntryType.FOLDER ? (
              <>
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
                <Folder size={16} />
              </>
            ) : (
              <File size={16} />
            )}
            {entry.type === EntryType.FILE && path ? (
              <Link
                to={path}
                onClick={handleClick}
                onContextMenu={handleClick}
                className="w-full"
              >
                <span className="text-card-foreground/80">{entry.name}.md</span>
                {/* <span className="text-card-foreground/35">.md</span> */}
              </Link>
            ) : (
              <span
                className="w-full"
                onClick={handleClick}
                onContextMenu={handleClick}
              >
                {entry.name}
              </span>
            )}
          </div>
        </div>
        {entry.type === EntryType.FOLDER && isOpen && (
          <ul className="pl-9">
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
