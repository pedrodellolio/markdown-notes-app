import { getEntryById } from "@/api/entry";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQueries } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export function NavBreadcrumb() {
  const { pathname } = useLocation();
  const segments = decodeURIComponent(pathname).split("/").slice(1);

  const entryQueries = useQueries({
    queries: segments.map((entryId) => {
      return {
        queryKey: ["entryName", entryId],
        queryFn: () => getEntryById(entryId),
      };
    }),
  });

  const isLoading = entryQueries.some((result) => result.isLoading);
  if (isLoading) return <p>Loading...</p>;

  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList>
        {entryQueries.map((res, i) => {
          const entryName = res.data?.name;
          return (
            <div key={i} className="flex flex-row items-center gap-2">
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-muted-foreground hover:text-muted-foreground"
                >
                  <p className="text-xs">{entryName?.toUpperCase()}</p>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i < segments.length - 1 && (
                <BreadcrumbSeparator />
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
