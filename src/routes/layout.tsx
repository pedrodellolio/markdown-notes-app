import { Outlet, useLoaderData } from "react-router-dom";
import usePreferences from "../hooks/use-preferences";
import SideNav from "../components/side-nav";
import TopNav from "../components/top-nav";
import { getFileList } from "../api/file";

export async function loader() {
  const files = await getFileList();
  return { files };
}

export default function Layout() {
  const { files } = useLoaderData() as {
    files: { id: string; name: string }[];
  };
  const { isMenuOpen } = usePreferences();

  return (
    <div className="flex flex-row">
      <SideNav files={files}/>
      <main className={`${isMenuOpen && "ml-64"} w-full`}>
        <TopNav />
        <Outlet />
      </main>
    </div>
  );
}
