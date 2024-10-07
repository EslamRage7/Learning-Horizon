import "../css/courses.css";
import "../css/responsive.css";
import "video-react/dist/video-react.css";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import { FaOpencart } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiErrorAlt } from "react-icons/bi";
import CryptoJS from "crypto-js";
import { Link, useParams } from "react-router-dom";
import {
  Player,
  ControlBar,
  ForwardControl,
  ReplayControl,
  PlaybackRateMenuButton,
} from "video-react";
import Loader from "../Registration/loader";

function CoursesVideoes() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { courseID } = useParams();
  const playerRef = useRef(null);
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("8zL5$") || sessionStorage.getItem("8zL5$");
  });

  const secretKey = "e#J8zL5$e2f!v9@k8U%tR6^wO4z&Q3m*J9bL$7yP8";
  const decryptData = (cipherText, secretKey) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  };

  useEffect(() => {
    const encryptedFullName =
      localStorage.getItem("8zL5$") || sessionStorage.getItem("8zL5$");
    if (encryptedFullName) {
      const decryptedFullName = decryptData(encryptedFullName, secretKey);
      setUserName(decryptedFullName);
    }
    const preventContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", preventContextMenu);
    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

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
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://learning-horizon-server.premiumasp.net/Api/Lesson/GetAllLessons"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const filteredVideos = data
          .filter((video) => video.courseId === parseInt(courseID))
          .sort((a, b) => a.lessonOrderInCourse - b.lessonOrderInCourse);

        setVideos(filteredVideos);
        setCurrentVideo(filteredVideos[0] || null);
      } catch (error) {}
    };

    fetchVideos();

    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loaderTimeout);
  }, [courseID]);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    if (playerRef.current) {
      playerRef.current.load();
      playerRef.current.seek(0);
    }
  };

  const videoList = useMemo(() => {
    return videos.length > 0 ? (
      videos.map((video) => (
        <div key={video.lessonId} className="sidebar-video mb-3">
          <div
            className="sidebar-video-title"
            onClick={() => handleVideoSelect(video)}
          >
            <div className="d-flex align-items-center">
              <IoIosArrowDropright className=" mt-1 me-1" />
              <p>{video.lessonTittle}</p>
            </div>
            <div className="d-flex mt-3">
              <span className="text-black-50">
                Lesson-{video.lessonOrderInCourse}
              </span>
              <h6 className="ms-auto">
                {video.lessonIsFree ? "free" : "Premium"}
              </h6>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div>No other videos available</div>
    );
  }, [videos]);

  return (
    <>
      <Helmet>
        <link rel="icon" href="./16x16.ico" sizes="16x16" />
        <title>Learning Horizon - Courses</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="courses-videos p-3">
          <div className="container-fluid">
            <div className="row p-lg-4 p-md-1">
              <div className="col-lg-8 col-md-8 text-capitalize position-relative">
                {currentVideo ? (
                  <div className="featured-video mb-4 position-relative">
                    <h2 className="course-title mt-3 pills-head-course">
                      course-{currentVideo.courseTittle}
                    </h2>
                    <div className="video-wrapper position-relative">
                      <Player
                        ref={playerRef}
                        controls
                        className={`video-player mt-3 mb-3 ${
                          !currentVideo.lessonIsFree ? "blurred-video" : ""
                        }`}
                        controlsList="nodownload"
                      >
                        <source
                          src={`https://learning-horizon-server.premiumasp.net/Api/Lesson/GetLessonFile?path=${encodeURIComponent(
                            currentVideo.lessonPath
                          )}`}
                          type="video/mp4"
                        />
                        <div className="copyrights">{userName}</div>
                        <ControlBar autoHide={true}>
                          <ForwardControl seconds={10} order={3.1} />
                          <ReplayControl seconds={10} order={2.1} />
                          <PlaybackRateMenuButton
                            rates={[0.5, 1, 1.5, 2, 2.5]}
                          />
                        </ControlBar>
                      </Player>

                      {!currentVideo.lessonIsFree && (
                        <div className="video-overlay">
                          <div className="overlay-content">
                            <h3>
                              <div className="text-center text-capitalize">
                                <BiErrorAlt className="me-1 mb-1 icon-buy" />
                                Enroll in the course to watch lessons
                              </div>
                            </h3>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center big-title">
                      <h4 className="video-title text-capitalize">
                        <MdOutlineDoubleArrow className="me-1 video-title" />
                        {`Lesson ${currentVideo.lessonOrderInCourse} - ${currentVideo.lessonTittle}`}
                      </h4>
                      {/* {currentVideo.coursePrice === 0 ? (
                        <span className="free-badge">Available for Free</span>
                      ) : (
                        <Link
                          target="blank"
                          to="/payment"
                          className="enroll-link"
                        >
                          <FaOpencart className="me-2 icon-buy" />
                          Enroll Now
                        </Link>
                      )} */}
                    </div>
                  </div>
                ) : (
                  <div>No videos available for this course</div>
                )}
              </div>
              <div className="col-lg-4 col-md-4 text-start mt-5 pt-4 text-capitalize">
                <div className="sidebar-course">
                  <div className="d-flex align-items-center ">
                    <MdOutlineVideoLibrary className="material-symbols-outlined me-1" />
                    <h4 className="mb-3 mt-3">Lessons</h4>
                  </div>
                  {videoList}
                </div>
              </div>
            </div>
          </div>
          <Link className="codex text-center m-auto btn mt-3" to="">
            © 2024 <span>Codex</span>. All rights reserved.
          </Link>
        </div>
      )}
    </>
  );
}

export default CoursesVideoes;
