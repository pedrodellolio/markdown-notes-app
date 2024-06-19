import { Outlet, useNavigate } from "react-router-dom";
import usePreferences from "../hooks/use-preferences";
import SideNav from "../components/side-nav";
import TopNav from "../components/top-nav";
import { firstTimeRegistered } from "../api/db";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { Entry } from "@/models/entry";
import { getEntryByName } from "@/api/entry";

export default function Layout() {
  const { isMenuOpen } = usePreferences();
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    firstTimeRegistered().then((defaultEntry) => {
      setIsDbInitialized(true);

      if (defaultEntry) return navigate(`/file/${defaultEntry.id}`);
      getEntryByName("Getting Started").then((entry) =>
        navigate(`/file/${entry?.id}`)
      );
    });
  }, []);

  if (!isDbInitialized) return null;
  return (
    <div className="relative flex flex-row w-full overflow-hidden">
      {isMenuOpen && <SideNav />}
      <div className="flex flex-col w-full h-screen overflow-hidden">
        {/* <TopNav /> */}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
