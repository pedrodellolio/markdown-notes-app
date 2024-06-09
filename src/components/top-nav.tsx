import { Menu } from "lucide-react";
import usePreferences from "../hooks/use-preferences";

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
      <p className="text-gray-500">Home &gt; Getting Started</p>
    </nav>
  );
}
