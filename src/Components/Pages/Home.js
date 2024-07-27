import "../css/main.css";
import "../css/responsive.css";
import React, { useEffect, useState } from "react";
import Loader from "../Registration/Preloader";
import SlideHome from "./SlideHome";
import Sidebar from "./Sidebar";
import SmSidebar from "./Smslider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import SlideMaterial from "./SlideMaterial";
import Books from "./Books";

function Home() {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const options = [
    "San Francisco",
    "Gray's Anatomy",
    "Seattle",
    "Los Angeles",
    "Chicago",
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    //   axios
    //     .get("http://yourapi.com/api/videos")
    //     .then((response) => {
    //       setVideos(response.data);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching videos:", error);
    //     });
  }, []);

  const [isOpen, setIsOpen] = useState(true);
  const toggleSide = () => {
    setIsOpen(!isOpen);
  };

  const [close, setClose] = useState(false);
  const closeSide = () => {
    setClose(!close);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="box">
          <div className="container-fluid mt-5">
            <div className="row">
              {isOpen && <Sidebar />}
              <SmSidebar closeSide={closeSide} isOpen={!close} />
              <div
                className={`${
                  isOpen
                    ? "col-lg-10 col-md-10 col-sm-12"
                    : "col-lg-12 col-md-12 col-sm-12"
                }`}
              >
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="close">
                    <FontAwesomeIcon
                      icon={close ? faBars : faXmark}
                      className="mark"
                      onClick={closeSide}
                    />
                  </div>
                  {/* start home */}
                  <div
                    className="tab-pane fade show active pills-home"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                    tabIndex="0"
                  >
                    <h1 className="mb-5 mt-5 pills-head">Suggest For You</h1>
                    <div className="row mb-5 pb-5 m-auto text-center lasson-imgs">
                      {videos.map((video, index) => (
                        <div
                          key={index}
                          className="col-6 col-lg-6 col-md-6 col-sm-6"
                        >
                          <div className="lesson">
                            <video className="video-fluid" controls>
                              <source src={video.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      ))}
                    </div>
                    <h1 className="mb-5 mt-5 pills-head">Live lessons</h1>
                    <SlideHome />
                  </div>
                  {/* end home */}

                  {/* start material */}
                  <div
                    className="tab-pane fade"
                    id="v-pills-Material"
                    role="tabpanel"
                    aria-labelledby="v-pills-Material-tab"
                    tabIndex="0"
                  >
                    <h1 className="mb-5 mt-5 pills-head">Anatomy</h1>
                    <SlideMaterial />
                    <h1 className="mb-5 mt-5 pills-head">Pathology</h1>
                    <SlideMaterial />
                  </div>
                  {/* end material */}

                  {/* start session */}
                  <div
                    className="tab-pane fade"
                    id="v-pills-Session"
                    role="tabpanel"
                    aria-labelledby="v-pills-Session-tab"
                    tabIndex="0"
                  >
                    Session
                  </div>
                  {/* end session */}

                  {/* start books */}
                  <div
                    className="tab-pane fade books-tab"
                    id="v-pills-books"
                    role="tabpanel"
                    aria-labelledby="v-pills-books-tab"
                    tabIndex="0"
                  >
                    <Books />
                  </div>
                  {/* end books */}

                  <div
                    className="tab-pane fade"
                    id="v-pills-Training"
                    role="tabpanel"
                    aria-labelledby="v-pills-Training-tab"
                    tabIndex="0"
                  >
                    Training
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-Settings"
                    role="tabpanel"
                    aria-labelledby="v-pills-Settings-tab"
                    tabIndex="0"
                  >
                    Settings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
