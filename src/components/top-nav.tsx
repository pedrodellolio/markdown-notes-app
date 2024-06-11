import { Menu } from "lucide-react";
import usePreferences from "../hooks/use-preferences";
import { TopNavBreadcrumb } from "./top-nav-breadcrumb";

export default function SideNav() {
  const { isMenuOpen, setIsMenuOpen } = usePreferences();

  return (
    <nav
      className={`fixed top-0 ${
        isMenuOpen ? "left-64" : "left-0"
      } right-0 h-12 px-6 mx-auto flex flex-row items-center gap-6 font-medium text-sm bg-white z-10`}
    >
      {!isMenuOpen && (
        <button onClick={() => setIsMenuOpen(true)}>
          <Menu className="text-gray-600 mt-1" />
        </button>
      )}
      <TopNavBreadcrumb />
    </nav>
  );
}
