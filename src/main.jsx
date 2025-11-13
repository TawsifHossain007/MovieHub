import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Layout/Root";
import Home from "./Pages/Home";
import AllMovies from "./Pages/AllMovies";
import MyWishlist from "./Pages/MyWishList";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AuthRoot from "./Layout/AuthRoot";
import { ThemeProvider } from "./Components/ThemeContext/ThemeContext";
import AuthProvider from "./AuthProvider/AuthProvider";
import ErrorApps from "./Components/ErrorPage/ErrorPage";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import AddMovie from "./Pages/AddMovie/AddMovie";
import UpdateMovie from "./Pages/UpdateMovie/UpdateMovie";
import MyCollection from "./Pages/MyCollection";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

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
        path: "/MyWishlist",
        Component: MyWishlist,
      },
      {
        path: "movieDetails/:id",
        Component: MovieDetails
      },
      {
        path: "/addMovie",
        element: <PrivateRoute><AddMovie></AddMovie></PrivateRoute>
      },
      {
        path: "/movies/update/:id",
        element: <PrivateRoute><UpdateMovie></UpdateMovie></PrivateRoute>
      },
      {
        path: "/myCollection",
        element: <PrivateRoute><MyCollection></MyCollection></PrivateRoute>
      }
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
