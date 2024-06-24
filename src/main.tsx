import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout, { loader as layoutLoader } from "./routes/layout";
import { PreferencesProvider } from "./contexts/preferences-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Content, { loader as contentLoader } from "./routes/content";
import { EntriesProvider } from "./contexts/entries-context";
import { ThemeProvider } from "./components/theme-provider";
import Index from "./routes";
import ErrorPage from "./routes/error-page";
import "@fontsource-variable/jetbrains-mono";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: layoutLoader(queryClient),
    children: [
      { index: true, element: <Index /> },
      {
        path: ":entryId",
        loader: contentLoader(queryClient),
        element: <Content />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <EntriesProvider>
          <RouterProvider router={router} />
        </EntriesProvider>
      </PreferencesProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
