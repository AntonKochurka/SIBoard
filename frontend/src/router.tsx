import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout";
import SignInPage from "./apps/auth/pages/signin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <div>Home</div> },
      {
        path: "auth",
        children: [
          { path: "signin", element: <SignInPage /> },
        ],
      },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
]);
