import { useQuery } from "@tanstack/react-query";
import usePreferences from "../hooks/use-preferences";
import useEntries from "@/hooks/use-entries";
import NewEntryForm from "./forms/new-entry-form";
import SideNavHeader from "./side-nav-header";
import EntryItem from "./entry-item";
import { getEntryChildren } from "@/api/entry";

export default function SideNav() {
  const { isMenuOpen } = usePreferences();
  const { creating } = useEntries();

  const { data: rootEntries } = useQuery({
    queryKey: ["entries", "root"],
    queryFn: () => getEntryChildren("root"),
  });

  return (
    <>
      <aside
        className={`relative w-64 flex-none overflow-hidden bg-background z-10 border border-r ${
          !isMenuOpen && "hidden"
        }`}
      >
        <SideNavHeader />
        <ul className="pt-2">
          {creating && creating.folderId === undefined && <NewEntryForm />}
          {rootEntries?.map((entry) => (
            <EntryItem key={entry.id} entry={entry} />
          ))}
        </ul>

      </aside>
    </>
  );
}
