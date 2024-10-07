import "../css/main.css";
import "../css/responsive.css";
import "./css/admin.css";
import "./css/admin-responsive.css";
import React from "react";

import SideBarAdmin from "../Layout/SideBarAdmin";
import SmAdmin from "../Layout/SmAdmin";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import UsersTable from "./Users/UsersTable";

function Admin() {
  return (
    <>
      <Helmet>
        <title>Learning Horizon - Dash Board</title>
      </Helmet>

      <div className="box admin">
        <SmAdmin />
        <div className="container-fluid mt-5 mb-3">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-3 col-12">
              <SideBarAdmin />
            </div>
            <div className="col-lg-10 col-md-9 col-sm-9 col-12">
              <div className="tab-pane">
                <h1 className="mb-5 mt-3 pills-head-table ">Users Table</h1>
                <UsersTable />
              </div>
              <Link className="codex text-center m-auto btn mt-3" to="">
                © 2024 <span>Codex</span>. All rights reserved.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
