import "../css/responsive.css";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../Layout/SideBar";
import SmSideBar from "../Layout/SmSideBar";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

function Material() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userCourses, setUserCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getCourses = `https://learning-horizon-server.premiumasp.net/Api/Course/GetAllCourses`;

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

  const checkUser = () => {
    fetch("https://learning-horizon-server.premiumasp.net/Api/User")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        const secretKey = "e#J8zL5$e2f!v9@k8U%tR6^wO4z&Q3m*J9bL$7yP8";
        const encryptedEmail = localStorage.getItem("8zL5$");
        if (encryptedEmail) {
          const bytes = CryptoJS.AES.decrypt(encryptedEmail, secretKey);
          const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);

          const foundUser = data.find((user) => user.email === decryptedEmail);

          if (!foundUser) {
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
          } else {
            setUserCourses(foundUser.userCourses);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while fetching user data. Redirecting to login.",
          icon: "error",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          customClass: {
            popup: "custom-swal",
          },
        });
      });
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(getCourses);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleLinkClick = (courseId, coursePrice) => {
    const secretKey = "e#J8zL5$e2f!v9@k8U%tR6^wO4z&Q3m*J9bL$7yP8";
    const encryptedPrice = CryptoJS.AES.encrypt(
      coursePrice.toString(),
      secretKey
    ).toString();
    localStorage.setItem("CoursePrice", encryptedPrice);

    const fullName =
      localStorage.getItem("9@k8U%") || sessionStorage.getItem("9@k8U%");

    if (fullName) {
      window.open(`/home/course-videos/${courseId}`, "_blank");
    } else {
      navigate(`/login`);
    }
  };

  const enrolledCourses = courses.filter((course) =>
    userCourses.some((userCourse) => userCourse.courseId === course.courseId)
  );

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearchTerm = course.courseTittle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSelectedCourse =
      !selectedCourse || course.courseId === selectedCourse.courseId;

    return matchesSearchTerm && matchesSelectedCourse;
  });

  return (
    <>
      <Helmet>
        <link rel="icon" href="./16x16.ico" sizes="16x16" />
        <title>Learning Horizon - Material</title>
      </Helmet>
      <SmSideBar />
      <div className="container-fluid mt-5 mb-3 ">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-3 col-3 text-center sidebar">
            <SideBar />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-9 col-12">
            <div className="tab-pane text-capitalize">
              <div className="material">
                <div className="book-input">
                  <label className="search-icon" htmlFor="search1">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </label>
                  <input
                    className="form-control search"
                    id="search1"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="sections mt-4">
                  <button
                    className={`btn mt-2 me-2 ${
                      !selectedCourse ? "active" : "back"
                    }`}
                    onClick={() => setSelectedCourse(null)}
                  >
                    All Courses
                  </button>
                  {enrolledCourses.map((course) => (
                    <button
                      key={course.courseId}
                      className={`btn mt-2 me-2 ${
                        selectedCourse?.courseId === course.courseId
                          ? "active"
                          : "back"
                      }`}
                      onClick={() => handleCourseClick(course)}
                    >
                      {course.courseTittle}
                    </button>
                  ))}
                </div>
                <div className="row mt-5">
                  {enrolledCourses.length === 0 ? (
                    <div className="col-12">
                      <p className="text-center fw-bold">
                        No courses available at the moment
                      </p>
                    </div>
                  ) : filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <div
                        className="col-lg-4 col-md-6 col-sm-10 col-11 m-auto mb-4"
                        key={course.courseId}
                      >
                        <div className="box text-bg-dark pb-3">
                          <img
                            src={`https://learning-horizon-server.premiumasp.net/Api/Book/GetBookFile?path=${course.courseImagePath}`}
                            className="card-img img-fluid"
                            alt={course.courseTittle}
                          />
                          <div className="d-flex align-items-center justify-content-start card-head">
                            <span className="me-1 mb-1">
                              <FaUserCircle />
                            </span>
                            <h3 className="card-creator mt-2">
                              {course.courseCreator}
                            </h3>
                          </div>
                          <div className="card-info p-2 mt-5">
                            <h5 className="card-title mb-3">
                              {course.courseTittle}
                            </h5>
                            <div className="d-flex align-items-center">
                              <p className="card-price mt-3 me-auto">
                                {course.coursePrice !== 0
                                  ? `${course.coursePrice} EGP`
                                  : "Free"}
                              </p>
                              <button
                                className="btn d-flex align-items-center view"
                                onClick={() =>
                                  handleLinkClick(
                                    course.courseId,
                                    course.coursePrice
                                  )
                                }
                              >
                                View
                                <FontAwesomeIcon
                                  className="ms-2"
                                  icon={faChevronRight}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <p className="text-center">
                        No courses found matching your search criteria.
                      </p>
                    </div>
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
    </>
  );
}

export default Material;
