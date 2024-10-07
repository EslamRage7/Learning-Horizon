import "./css/registration.css";
import "./css/responsive-registration.css";
// import googleIcon from "../images/google.png";
import books from "../images/books.png";
import heal from "../images/heal.png";
import Dr from "../images/Group.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import { Helmet } from "react-helmet-async";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Login() {
  const apiUrl = "https://learning-horizon-server.premiumasp.net/Api/Login";

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const secretKey = "e#J8zL5$e2f!v9@k8U%tR6^wO4z&Q3m*J9bL$7yP8";
  const adminEmail = "admin@gmail.com";
  const adminPass = "44445012";

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      navigate("/home");
    }
  }, [navigate]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const responseMessage = (response) => {
    console.log(response);
  };
  const erroreMessage = (error) => {
    console.log(error);
  };

  useEffect(() => {
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

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
    password: Yup.string()
      .min(6, "*Password must be at least 6 characters")
      .required("*Password is required"),
  });

  const handleSubmit = async (values) => {
    if (values.email === adminEmail && values.password === adminPass) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Admin Login Successful!",
        text: "Welcome Dr. Issam",
        imageUrl: Dr,
        imageHeight: 150,
        imageAlt: "Admin Icon",
        showConfirmButton: false,
        customClass: {
          popup: "custom-swal",
        },
        timer: 3000,
      }).then(() => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      });
      return;
    }

    try {
      const response = await axios.post(
        apiUrl,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const encryptData = (data, secretKey) => {
          return CryptoJS.AES.encrypt(data, secretKey).toString();
        };
        const fullName = response.data.message;
        const encryptedFullName = encryptData(fullName, secretKey);

        if (rememberMe) {
          localStorage.setItem("savedEmail", values.email);
          localStorage.setItem("9@k8U%", encryptedFullName);
          localStorage.setItem("isConnected", "true");
          localStorage.setItem("isAuthenticated", "true");
        } else {
          localStorage.setItem("9@k8U%", encryptedFullName);
          sessionStorage.setItem("9@k8U%", encryptedFullName);
          sessionStorage.setItem("isConnected", "true");
          localStorage.setItem("isConnected", "true");
          sessionStorage.setItem("isAuthenticated", "true");
        }

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful!",
          text: "Great to see you again! Let's get started.",
          confirmButtonText: "Let's Go",
          customClass: {
            popup: "custom-swal",
          },
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/home");
          }
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Failed",
          text: response.data.message || "Login failed. Please try again.",
          showConfirmButton: true,
          customClass: {
            popup: "custom-swal",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "An error occurred while logging in. Please try again.",
        icon: "error",
        customClass: {
          popup: "custom-swal",
        },
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Learning Horizon - كورسات وكتب طبية تعليمية لتحسين مهاراتك الأكاديمية
          والمهنية
        </title>
      </Helmet>
      <div className="moving">
        <div className="books">
          <img src={books} className="img-fluid " alt="books" />
        </div>
        <div className="heal">
          <img src={heal} className="img-fluid heal" alt="heal" />
        </div>
      </div>
      <div className="all">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="head text-center">
                <h1 className="fw-bold">Welcome Back</h1>
                <p>
                  We're glad to have you back! Log in to explore the great
                  content and resources we offer.
                </p>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <ErrorMessage name="email" component="p" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="password">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
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
                <ErrorMessage name="password" component="p" />
              </div>
              <div className="forget d-flex justify-content-between align-items-center mb-3">
                <div className="form-check d-flex justify-content-between align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Remember me
                  </label>
                </div>
                <Link to="/resetPassword" className="forgot">
                  forgot password?
                </Link>
              </div>
              <div className="btns text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn mb-2 fw-bold btn-one"
                >
                  Login
                </button>
                <br />
                {/*
                <br />
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={erroreMessage}
                />
                */}
              </div>
              <h6 className="text-center mt-3 last">
                You don't have an account yet ?
                <span className="ms-1">
                  <Link to="/signup">Sign up</Link>
                </span>
              </h6>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
