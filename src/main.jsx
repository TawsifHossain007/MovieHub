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
import DashboardLayout from "./Layout/DashboardLayout";
import DashboardHome from "./Pages/DashboardHome/DashboardHome";
import MyProfile from "./Pages/MyProfile/MyProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        path: "/movieDetails/:id",
        Component: MovieDetails,
      },

      {
        path: "/movies/update/:id",
        element: (
          <PrivateRoute>
            <UpdateMovie></UpdateMovie>
          </PrivateRoute>
        ),
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
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "myWishlist",
        Component: MyWishlist,
      },
      {
        path: "addMovie",
        Component: AddMovie,
      },
      {
        path: "myCollection",
        Component: MyCollection,
      },
    ],
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
  </QueryClientProvider>
);
