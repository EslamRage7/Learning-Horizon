import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FaLink, FaDownload, FaLinkSlash } from "react-icons/fa6";
import SideBar from "../Layout/SideBar";
import { Link, useNavigate } from "react-router-dom";
import SmSideBar from "../Layout/SmSideBar";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";

function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  const getData = () => {
    fetch(`https://learning-horizon-server.premiumasp.net/Api/Book/GetAll`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  const getSections = () => {
    fetch(`https://learning-horizon-server.premiumasp.net/Api/Section`)
      .then((res) => res.json())
      .then((data) => setSections(data));
  };

  useEffect(() => {
    getData();
    getSections();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSectionClick = (sectionTittle) => {
    setSelectedSection(sectionTittle);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.bookTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSection =
      selectedSection === "" || book.sectionTittle === selectedSection;
    return matchesSearch && matchesSection;
  });

  return (
    <>
      <Helmet>
        <link rel="icon" href="./16x16.ico" sizes="16x16" />
        <title>Learning Horizon - Books</title>
      </Helmet>
      <SmSideBar />
      <div className="container-fluid mt-5 mb-3">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-3 col-3 text-center sidebar">
            <SideBar />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-9 col-12">
            <div className=" tab-pane">
              <div className="book-input">
                <label className="search-icon" htmlFor="search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </label>
                <input
                  className="form-control search"
                  id="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="sections mt-4 ">
                <button
                  className={`btn mt-2 me-2 ${
                    selectedSection === "" ? "active" : "back"
                  }`}
                  onClick={() => setSelectedSection("")}
                >
                  All Sections
                </button>
                {sections.map((section) => (
                  <button
                    key={section.sectionId}
                    className={`btn mt-2 me-2 ${
                      selectedSection === section.sectionTittle
                        ? "active"
                        : "back"
                    }`}
                    onClick={() => handleSectionClick(section.sectionTittle)}
                  >
                    {section.sectionTittle}
                  </button>
                ))}
              </div>
              <div className="book mt-5 text-capitalize">
                <div className="row">
                  {books.length === 0 ? (
                    <div className="col-12">
                      <p className="text-center fw-bold">
                        No books available at the moment
                      </p>
                    </div>
                  ) : filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => {
                      const isDisabled = book.isFree === false;
                      return (
                        <div
                          key={book.bookId}
                          className="col-lg-12 col-md-12 col-sm-12"
                        >
                          {/* Original card - visible only on large screens */}
                          <div className="card mb-4 d-none d-lg-block d-md-block">
                            <div className="d-flex align-items-center">
                              <img
                                className="img-fluid"
                                src={`https://learning-horizon-server.premiumasp.net/Api/Book/GetBookFile?path=${book.bookImageLink}`}
                                alt={book.bookTitle}
                              />
                              <div className="info ms-4">
                                <h3 className="text-capitalize">
                                  {book.bookTitle}
                                </h3>
                                <p>{book.bookDescription}</p>
                                <p className="fw-bold">{book.sectionTittle}</p>
                                <span className="price">
                                  {book.bookPrice === "0" ||
                                  book.isFree === true
                                    ? "Free"
                                    : `${book.bookPrice} EGP`}
                                </span>
                              </div>
                              <button
                                className={`links ms-auto pe-3 btn ${
                                  isDisabled ? "disabled" : ""
                                }`}
                                disabled={isDisabled}
                              >
                                {book.bookLink ? (
                                  <Link
                                    className="btn mb-2"
                                    to={book.bookLink}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <div className="d-flex align-items-center justify-content-center">
                                      <FaLink />
                                      <span className="ms-2"> Explore</span>
                                    </div>
                                  </Link>
                                ) : (
                                  <button className="btn mb-2 empty" disabled>
                                    <div className="d-flex align-items-center justify-content-center">
                                      <FaLinkSlash />
                                      <span className="ms-2"> Empty</span>
                                    </div>
                                  </button>
                                )}

                                <br />
                                <Link
                                  to={`https://learning-horizon-server.premiumasp.net/Api/Book/GetBookFile?path=${book.bookPath}`}
                                  className="btn download"
                                  download
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    <FaDownload />
                                    <span className="ms-2"> Download</span>
                                  </div>
                                </Link>
                              </button>
                            </div>
                          </div>

                          {/* New card - visible only on small screens */}
                          <div className="card mb-4 d-block d-lg-none d-md-none text-center">
                            <div className="d-flex align-items-center flex-column">
                              <img
                                className="img-fluid"
                                src={`https://learning-horizon-server.premiumasp.net/Api/Book/GetBookFile?path=${book.bookImageLink}`}
                                alt={book.bookTitle}
                              />
                              <div className="info mt-3">
                                <h4 className="text-capitalize">
                                  {book.bookTitle}
                                </h4>
                                <p>{book.bookDescription}</p>
                                <p className="fw-bold">{book.sectionTittle}</p>
                                <span className="price">
                                  {book.bookPrice === "0" ||
                                  book.isFree === true
                                    ? "Free"
                                    : `${book.bookPrice} EGP`}
                                </span>
                              </div>
                              <button
                                className={`links btn links mt-3 d-flex flex-column justify-content-center align-items-center ${
                                  isDisabled ? "disabled" : ""
                                }`}
                                disabled={isDisabled}
                              >
                                {book.bookLink ? (
                                  <Link
                                    className="btn mb-3"
                                    to={book.bookLink}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <div className="d-flex align-items-center justify-content-center">
                                      <FaLink />
                                      <span className="ms-2"> Explore</span>
                                    </div>
                                  </Link>
                                ) : (
                                  <button className="btn empty mb-2" disabled>
                                    <div className="d-flex align-items-center justify-content-center">
                                      <FaLinkSlash />
                                      <span className="ms-2"> Empty</span>
                                    </div>
                                  </button>
                                )}

                                <Link
                                  to={`https://learning-horizon-server.premiumasp.net/Api/Book/GetBookFile?path=${book.bookPath}`}
                                  className="btn download"
                                  download
                                >
                                  <div className="d-flex align-items-center justify-content-center">
                                    <FaDownload />
                                    <span className="ms-2"> Download</span>
                                  </div>
                                </Link>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-12">
                      <p className="text-center">
                        No books found matching your search criteria.
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

export default Books;
