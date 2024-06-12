import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./routes/layout";
import { PreferencesProvider } from "./contexts/preferences-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Content from "./routes/content";
import { EntriesProvider } from "./contexts/entries-context";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "file/:id",
        element: <Content />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <PreferencesProvider>
      <EntriesProvider>
        <RouterProvider router={router} />
      </EntriesProvider>
    </PreferencesProvider>
  </QueryClientProvider>
);
