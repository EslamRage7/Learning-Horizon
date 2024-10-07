import "../css/team.css";
import eslam from "../images/eslam.jpeg";
import { Helmet } from "react-helmet-async";
function Team() {
  return (
    <div className="big">
      <Helmet>
        <link rel="icon" href="./16x16.ico" sizes="16x16" />
        <title>Learning Horizon - Codex</title>
      </Helmet>
      <div className="team">
        <div className="container-fluid mt-5 mb-3">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 m-auto mb-5">
              <div className="box">
                <div className="round">
                  <img className="" src={eslam} alt="eslam" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 col-12 m-auto mb-5">
              <div className="box">
                <img className="img-fluid" src="" alt="" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 m-auto mb-5">
              <div className="box">
                <img className="img-fluid" src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Team;
