import logo from "../images/Group1.png";
import React, { useState } from "react";
import { BiSolidVideos } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";
import { FaPhotoFilm } from "react-icons/fa6";
import { FaUsers, FaBook } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function SmAdmin() {
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
    return location.pathname === path
      ? "nav-link active d-flex align-items-center"
      : "nav-link d-flex align-items-center";
  };

  return (
    <>
      <nav className="navbar sm-side sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img src={logo} className="img-fluid" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <FaBars />
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mt-3">
              <li className="nav-item">
                <Link
                  className={getNavLinkClass("/admin")}
                  aria-current="page"
                  to="/admin"
                >
                  <FaUsers />
                  <span className="ms-1">Users</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${getNavLinkClass("/admin/add")} mt-1`}
                  aria-current="page"
                  to="/admin/add"
                >
                  <MdLibraryAdd />
                  <span className="ms-1">Add</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${getNavLinkClass("/admin/suggests")} mt-1`}
                  aria-current="page"
                  to="/admin/suggests"
                >
                  <FaPhotoFilm />
                  <span className="ms-1">Suggests</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${getNavLinkClass("/admin/books")} mt-1`}
                  aria-current="page"
                  to="/admin/books"
                >
                  <FaBook />
                  <span className="ms-1">Books</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${getNavLinkClass("/admin/lessons")} mt-1`}
                  aria-current="page"
                  to="/admin/lessons"
                >
                  <BiSolidVideos />
                  <span className="ms-1">Courses</span>
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="nav-link d-flex align-items-center"
                  type="button"
                >
                  <ImExit />
                  <span className="ms-1">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SmAdmin;
