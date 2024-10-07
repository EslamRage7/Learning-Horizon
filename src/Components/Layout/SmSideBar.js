import logo from "../images/Group1.png";
import React, { useState } from "react";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { FaHome, FaBook, FaCog, FaChalkboardTeacher } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function SmSideBar() {
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
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("isConnected");
        sessionStorage.removeItem("isConnected");
        localStorage.removeItem("9@k8U%");
        sessionStorage.removeItem("9@k8U%");
        localStorage.removeItem("8zL5$");
        sessionStorage.removeItem("8zL5$");
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
          <Link className="navbar-brand" to="/Home">
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
                  className={getNavLinkClass("/home")}
                  aria-current="page"
                  to="/home"
                >
                  <FaHome />
                  <span className="ms-1">Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${getNavLinkClass("/material")} mt-1`}
                  aria-current="page"
                  to="/material"
                >
                  <HiMiniSquare3Stack3D />
                  <span className="ms-1">Material</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${getNavLinkClass("/books")} mt-1`}
                  aria-current="page"
                  to="/books"
                >
                  <FaBook />
                  <span className="ms-1">Books</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${getNavLinkClass("/sessions")} mt-1`}
                  aria-current="page"
                  to="/sessions"
                >
                  <FaChalkboardTeacher />
                  <span className="ms-1">Sessions</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`${getNavLinkClass("/settings")} mt-1`}
                  aria-current="page"
                  to="/settings"
                >
                  <FaCog />
                  <span className="ms-1">Settings</span>
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

export default SmSideBar;
