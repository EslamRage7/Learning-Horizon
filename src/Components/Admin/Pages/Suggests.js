import SuggestTable from "../Suggest/SuggestTable";
import SliderTable from "../Slide/SliderTable";
import SmAdmin from "../../Layout/SmAdmin";
import SideBarAdmin from "../../Layout/SideBarAdmin";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Suggests() {
  return (
    <>
      <Helmet>
        <title>Dash Board - Suggests</title>
      </Helmet>

      <SmAdmin />
      <div className="container-fluid mt-5 mb-3">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-3 col-12">
            <SideBarAdmin />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-9 col-12">
            <div className="tab-pane">
              <h1 className="mb-5 mt-3 pills-head-table ">
                Banner images table
              </h1>
              <SliderTable />
              <h1 className="mb-5 mt-5 pills-head-table ">
                Suggested Videos table
              </h1>
              <SuggestTable />
            </div>
            <Link className="codex text-center m-auto btn mt-3" to="">
              © 2024 <span>Codex</span>. All rights reserved.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Suggests;
