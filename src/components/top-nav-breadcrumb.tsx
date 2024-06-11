import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

export function TopNavBreadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").slice(1);

  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList>
        {segments.map((segment, i) => {
          if (segment !== "file")
            return (
              <div key={i} className="flex flex-row items-center gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={"/"}>{segment}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {i < segments.length - 1 && (
                  <BreadcrumbSeparator className="mt-1" />
                )}
              </div>
            );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
