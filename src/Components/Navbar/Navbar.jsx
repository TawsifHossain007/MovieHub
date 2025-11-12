import React, { use, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/allMovies">All Movies</NavLink>
      </li>
      {user &&  <>
        <li>
          <NavLink to="/myCollection">My Collection</NavLink>
        </li>
        <li>
          <NavLink to="/addMovie">Add a Movie</NavLink>
        </li>
        <li>
          <NavLink to="/updateMovie">Update Movie</NavLink>
        </li>
        </>
      }
    </>
  );

  return (
    <div className="navbar shadow-md backdrop-blur-md border-b border-base-300 md:w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className="text-xl font-heading font-bold text-primary">
          MovieHub
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {/* Theme toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL} alt="User Avatar" />
              </div>
            </div>

            {/* Dropdown Card */}
            <ul
              tabIndex={0}
              className="dropdown-content z-[999] menu p-4 shadow-lg bg-base-100 rounded-xl w-72 
                 backdrop-blur-lg border border-base-300"
            >
              <li className="text-center flex flex-col items-center">
                {/* ✅ User photo INSIDE the dropdown */}
                <img
                  src={user.photoURL}
                  className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2 mb-2"
                  alt="User"
                />

                {/* User Name */}
                <h3 className="font-bold text-lg">{user.displayName}</h3>

                {/* User Email */}
                <p className="text-sm opacity-70">{user.email}</p>
              </li>

              <div className="divider"></div>
              <li>
                <button
                  className="btn btn-primary w-full text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-primary text-white ml-0 md:ml-5"
          >
            Logout
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 md:gap-4">
            <Link to={"/auth/login"} className="btn btn-primary text-white">
              Login
            </Link>
            <Link
              to={"/auth/register"}
              className="btn btn-primary text-white ml-0"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
