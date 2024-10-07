import "../css/settings.css";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";
import SideBar from "../Layout/SideBar";
import { Helmet } from "react-helmet-async";
import SmSideBar from "../Layout/SmSideBar";
import { Link } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { getCities } from "country-city";

function Settings() {
  const navigate = useNavigate();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const countries = countryList().getData();
  const [nameError, setNameError] = useState("");
  const [users, setUsers] = useState([]);
  const [matchedUser, setMatchedUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    university: "",
    major: "",
    academicYear: "",
    graduationYear: "",
  });
  const secretKey = "e#J8zL5$e2f!v9@k8U%tR6^wO4z&Q3m*J9bL$7yP8";

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

    if (matchedUser.country) {
      const countryCities = getCities(matchedUser.country);

      setCities(
        countryCities.map((city) => ({
          label: city,
          value: city,
        }))
      );

      const selectedCityValue = matchedUser.city
        ? {
            label: matchedUser.city,
            value: matchedUser.city,
          }
        : null;

      setSelectedCity(selectedCityValue);
    }
  }, [matchedUser.country, matchedUser.city]);

  useEffect(() => {
    if (selectedCountry) {
      const countryCities = getCities(selectedCountry.label);

      setCities(
        countryCities.map((city) => ({
          label: city,
          value: city,
        }))
      );

      setSelectedCity(null);
    }
  }, [selectedCountry]);

  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  };

  const decryptData = (cipherText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "*First Name must contain only letters")
      .required("*First Name is required")
      .trim(),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "*Last Name must contain only letters")
      .required("*Last Name is required")
      .trim(),
    country: Yup.string().trim().required("*Country is required"),
    city: Yup.string().trim().required("*City is required"),
    university: Yup.string().trim().required("*University is required"),
    major: Yup.string().trim().required("*Major is required"),
    academicYear: Yup.string().trim().required("*Academic year is required"),
    graduationYear: Yup.string()
      .trim()
      .required("*Graduation year is required"),
  });

  const academicYearOptions = [
    { value: "1D", label: "1st Year" },
    { value: "2D", label: "2nd Year" },
    { value: "3D", label: "3rd Year" },
    { value: "4D", label: "4th Year" },
    { value: "5D", label: "5th Year" },
    { value: "Internship", label: "Internship Year" },
    { value: "Graduated", label: "Graduated" },
  ];

  useEffect(() => {
    const encryptedFullName =
      localStorage.getItem("9@k8U%") || sessionStorage.getItem("9@k8U%");

    const decryptedFullName = decryptData(encryptedFullName);

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

          const encryptedEmail = encryptData(foundUser.email);
          localStorage.setItem("8zL5$", encryptedEmail);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const userUrl = `https://learning-horizon-server.premiumasp.net/Api/User?id=${matchedUser.id}`;

  const handleSubmit = async (values) => {
    const trimmedValues = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      country: values.country.trim(),
      city: values.city.trim(),
      university: values.university.trim(),
      major: values.major.trim(),
      academicYear: values.academicYear.trim(),
      graduationYear: values.graduationYear.trim(),
    };

    if (
      trimmedValues.firstName === matchedUser.firstName.trim() &&
      trimmedValues.lastName === matchedUser.lastName.trim() &&
      trimmedValues.country === matchedUser.country.trim() &&
      trimmedValues.city === matchedUser.city.trim() &&
      trimmedValues.university === matchedUser.university.trim() &&
      trimmedValues.major === matchedUser.major.trim() &&
      trimmedValues.academicYear === matchedUser.academicYear.trim() &&
      trimmedValues.graduationYear === matchedUser.graduationYear.trim()
    ) {
      Swal.fire({
        title: "No changes detected",
        text: "You have not modified any data.",
        icon: "info",
        confirmButtonText: "OK",
        customClass: {
          popup: "custom-swal",
        },
      });
      return;
    }

    // if (/\s/.test(trimmedValues.fullName)) {
    //   setNameError("Name should not contain spaces and unique.");
    //   return;
    // }

    try {
      const allUsersResponse = await axios.get(
        "https://learning-horizon-server.premiumasp.net/Api/User"
      );

      // const allUsers = allUsersResponse.data;

      // const isNameTaken = allUsers.some(
      //   (user) =>
      //     user.fullName.toLowerCase() ===
      //       trimmedValues.fullName.toLowerCase() && user.id !== matchedUser.id
      // );

      // if (isNameTaken) {
      //   setNameError("This name is already taken.");
      //   return;
      // } else {
      //   setNameError("");
      // }

      Swal.fire({
        title: "Do you want to save the changes?",
        showCancelButton: true,
        confirmButtonText: "Save",
        customClass: {
          popup: "custom-swal",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const updatedData = {
              firstName: trimmedValues.firstName,
              lastName: trimmedValues.lastName,
              userCountry: trimmedValues.country,
              userCity: trimmedValues.city,
              userUniversity: trimmedValues.university,
              userMajor: trimmedValues.major,
              userAcademicYear: trimmedValues.academicYear,
              userGraduationYear: trimmedValues.graduationYear,
            };

            await axios.put(userUrl, updatedData);
            const fullName = `${trimmedValues.firstName} ${trimmedValues.lastName}`;
            const encryptedFullName = encryptData(fullName);
            localStorage.setItem("9@k8U%", encryptedFullName);
            sessionStorage.setItem("9@k8U%", encryptedFullName);

            Swal.fire({
              title: "Done",
              text: "Your profile updated successfully",
              icon: "success",
              confirmButtonText: "OK",
              customClass: {
                popup: "custom-swal",
              },
            }).then(() => {
              navigate("/home");
            });
          } catch (error) {
            Swal.fire({
              title: "Error",
              text: `An error occurred: ${
                error.response && error.response.data
                  ? JSON.stringify(error.response.data, null, 2)
                  : error.message
              }`,
              icon: "error",
              customClass: {
                popup: "custom-swal",
              },
            });
          }
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Error fetching users: ${error.message}`,
        icon: "error",
        customClass: {
          popup: "custom-swal",
        },
      });
    }
  };

  const deleteUser = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        popup: "custom-swal",
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        html: `<p style="font-weight: bold;">This action cannot be undone, and your data will be permanently removed.</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
          popup: "custom-swal",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(userUrl, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) {
                return res.text().then((text) => {
                  throw new Error(`Network response was not ok: ${text}`);
                });
              }
              return res.text();
            })
            .then(() => {
              localStorage.removeItem("9@k8U%");
              localStorage.removeItem("isConnected");
              localStorage.removeItem("savedEmail");
              localStorage.removeItem("savedPassword");
              sessionStorage.removeItem("isConnected");

              swalWithBootstrapButtons
                .fire({
                  title: "Deleted!",
                  html: `<p style="font-weight: bold;">Your account has been successfully deleted</p>`,
                  icon: "success",
                  customClass: {
                    popup: "custom-swal",
                  },
                })
                .then(() => {
                  navigate("/");
                });
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                html: `<p style="font-weight: bold;">There was an error deleting <span style="color: red; font-weight: bold;"></span>: ${error.message}</p>`,
                icon: "error",
                customClass: {
                  popup: "custom-swal",
                },
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            html: `<p style="font-weight: bold;">Your account is still active and safe</p>`,
            icon: "error",
            customClass: {
              popup: "custom-swal",
            },
          });
        }
      });
  };

  return (
    <>
      <Helmet>
        <link rel="icon" href="./16x16.ico" sizes="16x16" />
        <title>Learning Horizon - Settings</title>
      </Helmet>
      <SmSideBar />
      <div className="container-fluid mt-5 mb-3">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-3 col-3 text-center sidebar">
            <SideBar />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-9 col-12">
            <div className=" tab-pane">
              <div className="settings">
                <h1 className="mb-5 pills-head pills-head-table">
                  Edit Your Profile
                </h1>
                <div className="user-edit">
                  <Formik
                    enableReinitialize
                    initialValues={{
                      firstName: matchedUser.firstName.trim() || "",
                      lastName: matchedUser.lastName.trim() || "",
                      country: matchedUser.country.trim() || "",
                      city: matchedUser.city.trim() || "",
                      university: matchedUser.university.trim() || "",
                      major: matchedUser.major.trim() || "",
                      academicYear: matchedUser.academicYear.trim() || "",
                      graduationYear: matchedUser.graduationYear.trim() || "",
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ isSubmitting, setFieldValue, values }) => (
                      <Form>
                        {nameError && (
                          <div className="alert alert-danger text-center">
                            {nameError}
                          </div>
                        )}
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputText"
                                className="form-label"
                              >
                                First Name
                              </label>
                              <Field
                                type="text"
                                name="firstName"
                                placeholder="Paul"
                                className="form-control"
                                id="exampleInputText"
                                aria-describedby="textHelp"
                              />
                              <ErrorMessage name="firstName" component="p" />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputText"
                                className="form-label"
                              >
                                Last Name
                              </label>
                              <Field
                                type="text"
                                name="lastName"
                                placeholder="Ehrlich"
                                className="form-control"
                                id="exampleInputText"
                                aria-describedby="textHelp"
                              />
                              <ErrorMessage name="lastName" component="p" />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="country" className="form-label">
                                Country
                              </label>
                              <Select
                                options={countries}
                                name="country"
                                value={countries.find(
                                  (option) => option.value === values.country
                                )} // عرض القيمة الحالية للمستخدم
                                onChange={(selectedOption) => {
                                  setSelectedCountry(selectedOption);
                                  setFieldValue(
                                    "country",
                                    selectedOption.value
                                  );
                                  const countryCities = getCities(
                                    selectedOption.label
                                  );
                                  setCities(
                                    countryCities.map((city) => ({
                                      label: city,
                                      value: city,
                                    }))
                                  );
                                  setSelectedCity(null);
                                }}
                                placeholder="Select your country"
                              />
                              <ErrorMessage name="country" component="p" />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="city" className="form-label">
                                City
                              </label>
                              <Select
                                options={cities}
                                value={
                                  cities.find(
                                    (option) => option.value === values.city
                                  ) || selectedCity
                                }
                                onChange={(selectedOption) => {
                                  setSelectedCity(selectedOption);
                                  setFieldValue("city", selectedOption.value);
                                }}
                                placeholder="Select your city"
                              />
                              <ErrorMessage name="city" component="p" />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="mb-3">
                              <label
                                htmlFor="university"
                                className="form-label"
                              >
                                University name
                              </label>
                              <Field
                                type="text"
                                name="university"
                                placeholder="Cairo University"
                                className="form-control"
                                id="university"
                              />
                              <ErrorMessage name="university" component="p" />
                            </div>

                            <div className="mb-3">
                              <label htmlFor="major" className="form-label">
                                University major
                              </label>
                              <Field
                                type="text"
                                name="major"
                                placeholder="Surgery"
                                className="form-control"
                                id="major"
                              />
                              <ErrorMessage name="major" component="p" />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="academicYear"
                                className="form-label"
                              >
                                Academic year
                              </label>
                              <Field
                                className="form-control"
                                name="academicYear"
                              >
                                {({ field, form }) => (
                                  <Select
                                    id="academicYear"
                                    name="academicYear"
                                    options={academicYearOptions}
                                    value={academicYearOptions.find(
                                      (option) => option.value === field.value
                                    )}
                                    onChange={(option) =>
                                      form.setFieldValue(
                                        "academicYear",
                                        option.value
                                      )
                                    }
                                  />
                                )}
                              </Field>
                              <ErrorMessage name="academicYear" component="p" />
                            </div>

                            <div className="mb-3">
                              <label
                                htmlFor="graduationYear"
                                className="form-label"
                              >
                                Graduation year
                              </label>
                              <Field
                                type="date"
                                name="graduationYear"
                                className="form-control"
                                id="graduationYear"
                              />
                              <ErrorMessage
                                name="graduationYear"
                                component="p"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 text-center text-lg-start text-md-start text-sm-start">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="btn save mt-3 fw-bold"
                            >
                              <FaEdit className="me-1" />
                              <span className="">Save Changes</span>
                            </button>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12 ">
                            <button
                              type="button"
                              onClick={() =>
                                deleteUser(matchedUser.id, matchedUser.fullName)
                              }
                              disabled={isSubmitting}
                              className="btn btn-danger mt-3 fw-bold d-flex align-items-center text-center ms-lg-auto ms-md-auto ms-sm-auto"
                            >
                              <span>Delete Account</span>
                              <MdDelete className="ms-1 icon-delete" />
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
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

export default Settings;
