



import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Root from "./Root";
import ProfilePage from "./pages/Profile";
import ErrorPage from "./pages/Error";
import { HomePage } from "./pages/Home";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:id",
    element: <Root />,
    children: [
      {
        index: true,
        element: <ProfilePage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
  // catch-all route
  {
    path: "*",
    element: <Navigate to='/error' state={{ error: { status: 404, message: "Page non trouvée" } }} />,
    errorElement: <ErrorPage />,
  },
];



const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
