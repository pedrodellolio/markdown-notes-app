import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout, { loader as layoutLoader } from "./routes/layout";
import { PreferencesProvider } from "./contexts/preferences-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Content, { loader as contentLoader } from "./routes/content";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    children: [
      {
        path: "file/:id",
        element: <Content />,
        loader: contentLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PreferencesProvider>
        <RouterProvider router={router} />
      </PreferencesProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
