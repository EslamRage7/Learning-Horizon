import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import CryptoJS from "crypto-js";
import Loader from "./loader";
import Swal from "sweetalert2";

function SignUp() {
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState("");

  const verifyApiUrl = `https://learning-horizon-server.premiumasp.net/Api/SignUp/verify-email`;
  const userApiUrl = `https://learning-horizon-server.premiumasp.net/Api/User`;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

    email: Yup.string()
      .email("*Invalid email address")
      .trim()
      .required("*Email is required"),
    password: Yup.string()
      .min(6, "*Password must be at least 6 characters")
      .required("*Password is required"),
    studentConfirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "*Passwords must match")
      .required("*Confirm Password is required"),
  });

  const secretKey = "e#J8zL5$e2f!v9@k8U%tR6^wO4z&Q3m*J9bL$7yP8";

  const encryptData = (data) => {
    const dataString = typeof data === "string" ? data : data.toString();
    return CryptoJS.AES.encrypt(dataString, secretKey).toString();
  };

  const handleSubmit = async (values) => {
    // if (/\s/.test(values.fullName)) {
    //   setNameError("Name should not contain spaces and must be unique");
    //   return;
    // }
    // setNameError("");

    const trimmedValues = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      password: values.password,
      studentConfirmPassword: values.studentConfirmPassword,
    };

    try {
      const response = await axios.get(userApiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const users = response.data;
      // const userExists = users.find(
      //   (user) => user.fullName === trimmedValues.fullName
      // );

      // if (userExists) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Username Already Taken",
      //     text: `The username "${trimmedValues.fullName}" is already in use. Please choose another one.`,
      //     customClass: {
      //       popup: "custom-swal",
      //     },
      //   });
      //   return;
      // }

      const emailResponse = await axios.post(
        verifyApiUrl,
        { email: trimmedValues.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (emailResponse.data.message === "This Email is already registered") {
        Swal.fire({
          icon: "error",
          title: "Email Already Registered",
          text: "This email is already associated with an account. Please use a different email.",
          customClass: {
            popup: "custom-swal",
          },
        });
      } else {
        const emailCode = emailResponse.data.toString();
        if (typeof emailCode !== "string") {
          console.error("Expected a string but got:", typeof emailCode);
        }

        Swal.fire({
          icon: "success",
          title: "Success!",
          html: "An email with verification code was sent,</br> Kindly check your inbox.",
          confirmButtonText: "Continue",
          customClass: {
            popup: "custom-swal",
          },
        }).then((res) => {
          if (res.isConfirmed) {
            localStorage.setItem("signupData", JSON.stringify(trimmedValues));
            const fullName = `${trimmedValues.firstName} ${trimmedValues.lastName}`;
            const encryptedFullName = encryptData(fullName, secretKey);

            localStorage.setItem("9@k8U%", encryptedFullName);
            const encryptedCode = encryptData(emailCode);
            if (encryptedCode) {
              localStorage.setItem("code", encryptedCode);
            }
            navigate("/emailVerification");
          }
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setNameError("An error occurred while processing your request.");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="moving">
            <div className="books">
              <img src={books} className="img-fluid " alt={books} />
            </div>
            <div className="heal">
              <img src={heal} className="img-fluid heal" alt={heal} />
            </div>
          </div>
          <div className="all">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                studentConfirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="head text-center">
                    <h1 className="fw-bold">Create Account</h1>
                    <p>
                      Create your account to unlock exclusive content and start
                      your journey with us today
                    </p>
                  </div>
                  {nameError && (
                    <div className="alert alert-danger text-center">
                      {nameError}
                    </div>
                  )}
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputText1"
                          className="form-label"
                        >
                          First Name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="Paul"
                          className="form-control"
                          id="exampleInputText1"
                          aria-describedby="textHelp"
                        />
                        <ErrorMessage name="firstName" component="h2" />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
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
                        <ErrorMessage name="lastName" component="h2" />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Brandonelouis@gmail.com"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <ErrorMessage name="email" component="h2" />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <div className="password">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="......"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                      <span onClick={togglePassword}>
                        {showPassword ? (
                          <FontAwesomeIcon className="eye" icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon className="eye" icon={faEye} />
                        )}
                      </span>
                    </div>
                    <ErrorMessage name="password" component="h2" />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword2"
                      className="form-label"
                    >
                      Confirm Password
                    </label>
                    <div className="password">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="studentConfirmPassword"
                        placeholder="......"
                        className="form-control"
                        id="exampleInputPassword2"
                      />
                      <span onClick={toggleConfirmPassword}>
                        {showConfirmPassword ? (
                          <FontAwesomeIcon className="eye" icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon className="eye" icon={faEye} />
                        )}
                      </span>
                    </div>
                    <ErrorMessage
                      name="studentConfirmPassword"
                      component="h2"
                    />
                  </div>

                  <div className="btns text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn mb-3 fw-bold btn-one"
                    >
                      Next
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
}

export default SignUp;
