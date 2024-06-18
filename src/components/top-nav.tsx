import { Menu } from "lucide-react";
import usePreferences from "../hooks/use-preferences";
import { TopNavBreadcrumb } from "./top-nav-breadcrumb";
import { ModeToggle } from "./mode-toggle";

export default function SideNav() {
  const { isMenuOpen, setIsMenuOpen } = usePreferences();

  return (
    <nav
      className={`px-6 py-2 mx-auto flex flex-row items-center justify-between w-full gap-6 font-medium text-sm bg-background`}
    >
      {!isMenuOpen && (
        <button onClick={() => setIsMenuOpen(true)}>
          <Menu className="text-gray-600 mt-1" />
        </button>
      )}
      <TopNavBreadcrumb />
      <ModeToggle />
    </nav>
  );
}
