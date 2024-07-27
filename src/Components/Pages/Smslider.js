import React from "react";
import support from "../images/support.png";
import logo from "../images/al.png";

function SmSidebar({ isOpen }) {
  return (
    <div
      className={`col-lg-2 col-md-2 col-sm-2 sm-sidebar ${
        isOpen ? "" : "hide"
      }`}
    >
      <div
        className="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <div className="logo text-center">
          <img src={logo} className="img-fluid" alt="Logo" />
        </div>
        <div className="btn-sidebar">
          <button
            className="nav-link mb-1 active "
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >
            <span className="material-symbols-outlined icon m-auto">apps</span>
          </button>
        </div>
        <div className="btn-sidebar">
          <button
            className="nav-link mb-1"
            id="v-pills-Material-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-Material"
            type="button"
            role="tab"
            aria-controls="v-pills-Material"
            aria-selected="false"
          >
            <span className="material-symbols-outlined icon m-auto">
              data_table
            </span>
          </button>
        </div>
        <div className="btn-sidebar">
          <button
            className="nav-link mb-1"
            id="v-pills-Session-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-Session"
            type="button"
            role="tab"
            aria-controls="v-pills-Session"
            aria-selected="false"
          >
            <span className="material-symbols-outlined icon m-auto">
              video_library
            </span>
          </button>
        </div>
        <div className="btn-sidebar">
          <button
            className="nav-link mb-1"
            id="v-pills-books-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-books"
            type="button"
            role="tab"
            aria-controls="v-pills-books"
            aria-selected="false"
          >
            <span className="material-symbols-outlined icon m-auto">
              menu_book
            </span>
          </button>
        </div>
        <div className="btn-sidebar">
          <button
            className="nav-link mb-1"
            id="v-pills-Training-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-Training"
            type="button"
            role="tab"
            aria-controls="v-pills-Training"
            aria-selected="false"
          >
            <span className="material-symbols-outlined icon m-auto">
              model_training
            </span>
          </button>
        </div>
        <div className="btn-sidebar">
          <button
            className="nav-link mb-1"
            id="v-pills-Settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-Settings"
            type="button"
            role="tab"
            aria-controls="v-pills-Settings"
            aria-selected="false"
          >
            <span className="material-symbols-outlined icon m-auto">
              settings
            </span>
          </button>
        </div>
        <div className="support text-center">
          <img className="img-fluid" src={support} alt="Support" />
        </div>
      </div>
    </div>
  );
}

export default SmSidebar;
