import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Layout/Root";
import Home from "./Pages/Home";
import AllMovies from "./Pages/AllMovies";
import MyCollection from "./Pages/MyCollection";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AuthRoot from "./Layout/AuthRoot";
import { ThemeProvider } from "./Components/ThemeContext/ThemeContext";
import AuthProvider from "./AuthProvider/AuthProvider";
import ErrorApps from "./Components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorApps></ErrorApps>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/allMovies",
        Component: AllMovies,
      },
      {
        path: "/myCollection",
        Component: MyCollection,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthRoot,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
