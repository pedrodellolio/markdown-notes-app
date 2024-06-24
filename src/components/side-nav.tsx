import { useQuery } from "@tanstack/react-query";
import usePreferences from "../hooks/use-preferences";
import useEntries from "@/hooks/use-entries";
import NewEntryForm from "./forms/new-entry-form";
import SideNavHeader from "./side-nav-header";
import EntryItem from "./entry-item";
import { rootEntriesQuery } from "@/routes/layout";
import { ModeToggle } from "./mode-toggle";

export default function SideNav() {
  const { isMenuOpen } = usePreferences();
  const { creating } = useEntries();
  const { data: rootEntries } = useQuery(rootEntriesQuery());

  return (
    <>
      <aside
        className={`relative flex-none bg-muted/50 z-10 border border-r h-screen pb-6 ${
          !isMenuOpen
            ? "w-[60px] overflow-hidden pr-1"
            : "w-[300px] overflow-y-hidden hover:overflow-y-auto"
        }`}
      >
        <SideNavHeader />
        {isMenuOpen && (
          <ul className="pt-2">
            {creating && creating.folderId === undefined && <NewEntryForm />}
            {rootEntries?.map((entry) => (
              <EntryItem key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
        <div
          className={`absolute bottom-0 right-0 flex ${
            isMenuOpen ? "p-4" : "w-full py-4 justify-center"
          }`}
        >
          <ModeToggle />
        </div>
      </aside>
    </>
  );
}
