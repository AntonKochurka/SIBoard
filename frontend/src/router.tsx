import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
    //   { index: true, element: <Home /> },
    //   { path: 'about', element: <About /> },
    //   { path: '*', element: <NotFound /> },
    ],
  },
]);
