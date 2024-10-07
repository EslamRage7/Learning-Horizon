import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../images/Group1.png";
import support from "../images/support.png";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { FaHome, FaBook, FaCog, FaChalkboardTeacher } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import "./sidebar.css";

function SideBar() {
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
    return location.pathname === path ? "menu-item active " : "menu-item ";
  };

  return (
    <div className="side-home">
      <div className="sidebar-wrapper">
        <div className="sidebar-container">
          <div className="character-image">
            <img className="mb-4" src={logo} alt={logo} />
          </div>

          <div className="nav-menu">
            <Link to="/home">
              <div className={getNavLinkClass("/home")}>
                <FaHome />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Home</span>
              </div>
            </Link>

            <Link to="/material">
              <div
                className={`menu-item ${
                  location.pathname === "/material" ? "active" : ""
                }`}
              >
                <HiMiniSquare3Stack3D />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Material</span>
              </div>
            </Link>

            <Link to="/books">
              <div
                className={`menu-item ${
                  location.pathname === "/books" ? "active" : ""
                }`}
              >
                <FaBook />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Books</span>
              </div>
            </Link>

            <Link to="/sessions">
              <div
                className={`menu-item ${
                  location.pathname === "/sessions" ? "active" : ""
                }`}
              >
                <FaChalkboardTeacher />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Session</span>
              </div>
            </Link>

            <Link to="/settings">
              <div
                className={`menu-item ${
                  location.pathname === "/settings" ? "active" : ""
                }`}
              >
                <FaCog />
                <span className="ms-lg-2 ms-md-2 ms-sm-2">Settings</span>
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
          <div className="character-image">
            <img className="mt-2" src={support} alt={support} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
