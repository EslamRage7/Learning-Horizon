import { BiErrorAlt } from "react-icons/bi";
import SideBar from "../Layout/SideBar";
import SmSideBar from "../Layout/SmSideBar";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function Session() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73)) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", preventContextMenu);
    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);
  return (
    <>
      <Helmet>
        <link rel="icon" href="./16x16.ico" sizes="16x16" />
        <title>Learning Horizon - Sessions</title>
      </Helmet>
      <SmSideBar />
      <div className="Session">
        <div className="container-fluid mt-5 mb-3">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-3 col-3 text-center sidebar">
              <SideBar />
            </div>
            <div className="col-lg-10 col-md-9 col-sm-9 col-12">
              <div className=" tab-pane">
                <div className="text-center text-capitalize fw-bold d-flex justify-content-center align-items-center">
                  <BiErrorAlt className="me-1" />
                  Not Available Now
                </div>
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
export default Session;
