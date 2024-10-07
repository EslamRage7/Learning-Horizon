import AddBooks from "../Books/AddBooks";
import AddCourses from "../Courses/AddCourses";
import AddSections from "../Sections/AddSections";
import AddVideos from "../Videos/AddVideos";
import AddSlider from "../Slide/AddSlider";
import AddSuggest from "../Suggest/AddSuggest";
import SmAdmin from "../../Layout/SmAdmin";
import SideBarAdmin from "../../Layout/SideBarAdmin";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Add() {
  return (
    <>
      <Helmet>
        <title>Dash Board - Add</title>
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
                <AddSlider />
                <div className="mt-5"></div>
                <AddSuggest />
                <div className="mt-5"></div>
                <AddSections />
                <div className="mt-5"></div>
                <AddBooks />
                <div className="mt-5"></div>
                <AddCourses />
                <div className="mt-5"></div>
                <AddVideos />
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
export default Add;
