import bg from "./preloader.png";
import "./Preloader.css";
import "./responsive-preloader.css";
import { Helmet } from "react-helmet-async";

function Preloader() {
  <Helmet>
    <link rel="icon" href="./16x16.ico" sizes="16x16" />
  </Helmet>;
  return (
    <div className="preloader">
      <img className="bg img-fluid" src={bg} alt="bg" />
    </div>
  );
}
export default Preloader;
