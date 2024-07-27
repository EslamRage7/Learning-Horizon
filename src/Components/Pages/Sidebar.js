import support from "../images/support.png";
import logo from "../images/al.png";

function Sidebar() {
  return (
    <>
      <div className="col-lg-2 col-md-2 col-sm-2 sidebar">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <div className="logo text-center">
            <img className="img-fluid" src={logo} alt={logo} />
          </div>
          <div className="btn-sidebar">
            <button
              className="nav-link mb-1 active"
              id="v-pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#v-pills-home"
              type="button"
              role="tab"
              aria-controls="v-pills-home"
              aria-selected="true"
            >
              <span className="material-symbols-outlined icon">apps</span>
              <span className="word">Home</span>
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
              <span className="material-symbols-outlined icon">data_table</span>
              <span className="word">Material</span>
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
              <span className="material-symbols-outlined icon">
                video_library
              </span>
              <span className="word">Session</span>
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
              <span className="material-symbols-outlined icon">menu_book</span>
              <span className="word"> Books</span>
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
              <span className="material-symbols-outlined icon">
                model_training
              </span>
              <span className="word"> Training</span>
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
              <span className="material-symbols-outlined icon">settings</span>
              <span className="word"> Settings</span>
            </button>
          </div>
          <div className="support text-center">
            <img className="img-fluid" src={support} alt={support} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
