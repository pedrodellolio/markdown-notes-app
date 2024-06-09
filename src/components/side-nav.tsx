import { ChevronsLeft, FilePlus2 } from "lucide-react";
import usePreferences from "../hooks/use-preferences";
import { Link } from "react-router-dom";

interface Props {
  files: { id: string; name: string }[];
}
export default function SideNav({ files }: Props) {
  const { isMenuOpen, setIsMenuOpen } = usePreferences();

  return (
    <aside
      className={`fixed h-screen w-64 bg-gray-200 ${!isMenuOpen && "hidden"}`}
    >
      <div className="w-full p-3 px-4 flex flex-row justify-end items-center gap-4 text-gray-400">
        <button className="hover:text-gray-800">
          <FilePlus2 size={20} />
        </button>
        <button
          className="hover:text-gray-800"
          onClick={() => setIsMenuOpen(false)}
        >
          <ChevronsLeft />
        </button>
      </div>
      <div>
        <ul className="px-6">
          {files.map((f) => {
            return (
              <li
                className="text-gray-600 hover:text-gray-800 cursor-pointer"
                key={f.id}
              >
                <Link to={`file/${f.id}`}>{f.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
