import bg from "./preloader.png";
import "./Preloader.css";
import "./responsive-preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <img className="bg img-fluid" src={bg} alt="bg" />
    </div>
  );
}
export default Preloader;
