import { Outlet } from "react-router-dom";
import usePreferences from "../hooks/use-preferences";
import SideNav from "../components/side-nav";
import TopNav from "../components/top-nav";
import { firstTimeRegistered } from "../api/db";
import { useEffect, useState } from "react";

export default function Layout() {
  const { isMenuOpen } = usePreferences();
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    firstTimeRegistered().then(() => {
      setIsDbInitialized(true);
    });
  }, []);

  if (!isDbInitialized) return null;
  return (
    <div className="flex flex-row">
      <SideNav />
      <main className={`${isMenuOpen && "ml-64"} w-full`}>
        <TopNav />
        <Outlet />
      </main>
    </div>
  );
}
