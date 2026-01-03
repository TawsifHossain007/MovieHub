import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddCircleOutline, IoHomeOutline } from "react-icons/io5";
import { Link, NavLink, Outlet } from "react-router";
import { TbJewishStar } from "react-icons/tb";
import { BsCollectionPlay } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const DashboardLayout = () => {
  return (
    <div className=" bg-blue-50">
      <div className=" dashboard  drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbarw-full bg-linear-to-r from-blue-700 via-blue-600 to-blue-400">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4 font-bold text-2xl text-white">
              MovieHub Dashboard
            </div>
          </nav>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex bg-white min-h-full flex-col items-start backdrop-blur-md border-r border-blue-200 font-medium is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <FaArrowLeft></FaArrowLeft>
                  <span className="is-drawer-close:hidden">HomePage</span>
                </Link>
              </li>

              {/* Our Dashboard Links */}
              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Dashboard Home"
                  to={"/dashboard"}
                  end
                >
                  <IoHomeOutline>
                    stroke="currentColor" className="my-1.5 inline-block size-4"
                  </IoHomeOutline>
                  <span className="is-drawer-close:hidden">Dashboard Home</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Wishlist"
                  to={"/dashboard/myWishlist"}
                  end
                >
                  <TbJewishStar>
                    stroke="currentColor" className="my-1.5 inline-block size-4"
                  </TbJewishStar>
                  <span className="is-drawer-close:hidden">My Wishlist</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add Movie"
                  to={"/dashboard/addMovie"}
                  end
                >
                  <IoAddCircleOutline>
                    stroke="currentColor" className="my-1.5 inline-block size-4"
                  </IoAddCircleOutline>
                  <span className="is-drawer-close:hidden">Add Movie</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Collection"
                  to={"/dashboard/myCollection"}
                  end
                >
                  <BsCollectionPlay>
                    stroke="currentColor" className="my-1.5 inline-block size-4"
                  </BsCollectionPlay>
                  <span className="is-drawer-close:hidden">My Collection</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Profile"
                  to={"/dashboard/my-profile"}
                >
                  <CgProfile>
                    stroke="currentColor" className="my-1.5 inline-block size-4"
                  </CgProfile>
                  <span className="is-drawer-close:hidden">My Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
