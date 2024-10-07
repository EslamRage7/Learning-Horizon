import logo from "../images/Group1.png";
import { BiSolidVideos } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";
import { FaPhotoFilm } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { FaUsers, FaBook } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./sideAdmin.css";

function SideBarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
      customClass: {
        popup: "custom-swal",
      },
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("isAdmin");
        sessionStorage.removeItem("isAuthenticated");
        sessionStorage.removeItem("isAdmin");
        navigate("/");
      }
    });
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "menu-item active " : "menu-item ";
  };

  return (
    <div className="side-admin">
      <div className="sidebar-wrapper">
        <div className="sidebar-container">
          <div className="character-image">
            <img className="mb-4" src={logo} alt={logo} />
          </div>

          <div className="nav-menu">
            <Link to="/admin">
              <div className={getNavLinkClass("/admin")}>
                <FaUsers />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Users</span>
              </div>
            </Link>

            <Link to="/admin/add">
              <div
                className={`menu-item ${
                  location.pathname === "/admin/add" ? "active" : ""
                }`}
              >
                <MdLibraryAdd />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Add</span>
              </div>
            </Link>

            <Link to="/admin/suggests">
              <div
                className={`menu-item ${
                  location.pathname === "/admin/suggests" ? "active" : ""
                }`}
              >
                <FaPhotoFilm />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Suggests</span>
              </div>
            </Link>

            <Link to="/admin/books">
              <div
                className={`menu-item ${
                  location.pathname === "/admin/books" ? "active" : ""
                }`}
              >
                <FaBook />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Books</span>
              </div>
            </Link>

            <Link to="/admin/lessons">
              <div
                className={`menu-item ${
                  location.pathname === "/admin/lessons" ? "active" : ""
                }`}
              >
                <BiSolidVideos />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Courses</span>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="btn menu-item logout"
              type="button"
            >
              <ImExit />
              <span className="ms-lg-2 ms-md-2 ms-sm-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarAdmin;
