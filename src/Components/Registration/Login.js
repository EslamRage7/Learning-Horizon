import "./css/registration.css";
import "./css/responsive-registration.css";
import googleIcon from "../images/google.png";
import books from "../images/books.png";
import heal from "../images/heal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Login() {
  const clientId =
    "1080949125109-us11dj496acp1pgm9poqdmvmsi8p0aq6.apps.googleusercontent.com";

  const apiUrl = "http://medicalapi.runasp.net/Api/Login";

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail && savedPassword) {
      navigate("/home");
    }
  }, [navigate]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      console.log(JSON.stringify(values, null, 2));

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

      console.log("Response data", response.data);

      if (response.data.success) {
        const userName = response.data.userName;
        localStorage.setItem("userName", userName);
        if (rememberMe) {
          localStorage.setItem("savedEmail", values.email);
          localStorage.setItem("savedPassword", values.password);
        }
        navigate("/home");
      } else {
        setErrorMessage(
          response.data.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error logging in", error.response || error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      }
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while logging in. Please try again."
      );
    }
  };

  return (
    <>
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
          {({ errors, touched }) => (
            <Form>
              <div className="head text-center">
                <h1 className="fw-bold">Welcome Back</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adi, fugiat!</p>
              </div>
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
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
              <div className="forget d-flex justify-content-between align-items-center">
                <div className="mb-3 form-check">
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
                <button type="submit" className="btn mb-2 fw-bold btn-one">
                  Login
                </button>
                <br />
              </div>
              <h6 className="text-center mt-3 last">
                You don't have an account yet?
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
