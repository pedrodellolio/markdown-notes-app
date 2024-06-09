import { ChevronsLeft, Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import usePreferences from "../hooks/use-preferences";

export default function Layout() {
  const { isMenuOpen, setIsMenuOpen } = usePreferences();

  return (
    <div className="flex flex-row">
      <aside
        className={`bg-gray-200 w-[291px] ${!isMenuOpen && "hidden"}`}
      >
        <div className="w-full p-3 px-4 flex justify-end" >
          <button onClick={() => setIsMenuOpen(false)}>
            <ChevronsLeft className="text-gray-500" />
          </button>
        </div>
      </aside>
      <main className="w-full">
        <nav
          className={`fixed top-0 ${
            isMenuOpen ? "left-60" : "left-0"
          } right-0 h-12 px-6 mx-auto flex flex-row items-center gap-6 font-medium text-sm bg-white z-10`}
        >
          {!isMenuOpen && (
            <button onClick={() => setIsMenuOpen(true)}>
              <Menu className="text-gray-600 mt-1" />
            </button>
          )}
          <p className="text-gray-500">Home &gt; Getting Started</p>
        </nav>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
