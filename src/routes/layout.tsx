import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import SideNav from "../components/side-nav";
import { firstTimeRegistered } from "../api/db";
import Footer from "@/components/footer";
import { QueryClient } from "@tanstack/react-query";
import { getEntryChildren } from "@/api/entry";
import { useEffect } from "react";
import { Entry } from "@/models/entry";

export const rootEntriesQuery = () => ({
  queryKey: ["entries", "root"],
  queryFn: async () => getEntryChildren("root"),
});

export const loader = (qc: QueryClient) => async () => {
  const defaultEntry = await firstTimeRegistered();
  const query = rootEntriesQuery();
  const data = qc.getQueryData(query.queryKey) ?? (await qc.fetchQuery(query));
  return { data, defaultEntry };
};

export default function Layout() {
  const { defaultEntry } = useLoaderData() as { defaultEntry?: Entry | null };
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultEntry) navigate(`/${defaultEntry.id}`);
  }, []);

  return (
    <div className="relative flex flex-row w-full overflow-hidden">
      <SideNav />
      <div className="flex flex-col w-full h-screen overflow-hidden">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
