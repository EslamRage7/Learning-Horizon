import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import "video-react/dist/video-react.css";
import {
  Player,
  ForwardControl,
  ControlBar,
  ReplayControl,
  PlaybackRateMenuButton,
} from "video-react";
import SlideHome from "../Layout/SlideHome";
import SideBar from "../Layout/SideBar";
import { Helmet } from "react-helmet-async";
import SmSideBar from "../Layout/SmSideBar";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [matchedUser, setMatchedUser] = useState([]);
  const [users, setUsers] = useState([]);

  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const encryptedFullName =
      localStorage.getItem("9@k8U%") || sessionStorage.getItem("9@k8U%");

    const decryptedFullName = decryptData(encryptedFullName, secretKey);

    const [decryptedFirstName, decryptedLastName] =
      decryptedFullName.split(" ");

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://learning-horizon-server.premiumasp.net/Api/User"
        );
        setUsers(response.data);

        const foundUser = response.data.find(
          (user) =>
            user.firstName === decryptedFirstName &&
            user.lastName === decryptedLastName
        );

        if (foundUser) {
          setMatchedUser(foundUser);
          const encryptedEmail = CryptoJS.AES.encrypt(
            foundUser.email,
            secretKey
          ).toString();
          localStorage.setItem("8zL5$", encryptedEmail);
        } else {
          Swal.fire({
            title: "Account Deleted",
            text: "Your account has been deleted from the site. You will be logged out.",
            icon: "warning",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            customClass: {
              popup: "custom-swal",
            },
          }).then(() => {
            localStorage.removeItem("9@k8U%");
            sessionStorage.removeItem("9@k8U%");
            localStorage.removeItem("savedEmail");
            navigate("/login");
          });
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://learning-horizon-server.premiumasp.net/Api/Suggest"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const videoData = await Promise.all(
          data.map(async (video) => {
            const videoFileResponse = await fetch(
              `https://learning-horizon-server.premiumasp.net/Api/Lesson/GetLessonFile?path=${encodeURIComponent(
                video.videoPath
              )}`
            );
            if (!videoFileResponse.ok) {
              throw new Error("Network response was not ok");
            }
            return {
              url: videoFileResponse.url,
              title: video.videoName,
            };
          })
        );

        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
    const encryptedFullName =
      localStorage.getItem("9@k8U%") || sessionStorage.getItem("9@k8U%");
    if (encryptedFullName) {
      const decryptedFullName = decryptData(encryptedFullName, secretKey);
      setUserName(decryptedFullName);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("9@k8U%") && !sessionStorage.getItem("9@k8U%")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <link rel="icon" href="./16x16.ico" sizes="16x16" />
        <title>
          Learning Horizon - كورسات وكتب طبية تعليمية لتحسين مهاراتك الأكاديمية
          والمهنية
        </title>
      </Helmet>

      <div className="box home">
        <SmSideBar />
        <div className="container-fluid mt-5 mb-3">
          <div className="row">
            <div className="col-lg-2 col-md-3 col-sm-3 col-3 text-center sidebar">
              <SideBar />
            </div>
            <div className="col-lg-10 col-md-9 col-sm-9 col-12 text-center">
              <div className=" tab-pane text-start">
                <h1 className="mb-5 pills-head pills-head-table">
                  Welcome, {userName}
                </h1>
                <SlideHome />
                <h1 className="mb-5 mt-5 pills-head recommended">
                  Recommended for You
                </h1>
                <div className="suggested-videos">
                  <div className="row text-center">
                    {videos.length > 0 ? (
                      videos.map((video, index) => (
                        <div
                          className={
                            videos.length === 1
                              ? "col-lg-6 col-md-12 col-sm-11 col-11 ms-lg-0 m-auto"
                              : "col-lg-6 col-md-12 col-sm-11 col-11 m-auto"
                          }
                          key={index}
                        >
                          <div className="mb-3">
                            <Player
                              playsInline
                              src={video.url}
                              className="video-player"
                              autoPlay
                            >
                              <ControlBar autoHide={true}>
                                <ForwardControl seconds={10} order={3.1} />
                                <ReplayControl seconds={10} order={2.1} />
                                <PlaybackRateMenuButton
                                  rates={[0.5, 1, 1.5, 2]}
                                />
                              </ControlBar>
                            </Player>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center fw-bold">
                        No videos to display
                      </p>
                    )}
                  </div>
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

export default Home;
