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
import Loader from "./Preloader";

function Signup() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
    userName: Yup.string()
      .required("Name is required")
      .trim()
      .min(6, "At least 6 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .trim()
      .required("Email is required"),
    passwordHash: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    studentConfirmPassword: Yup.string()
      .oneOf([Yup.ref("passwordHash"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = (values) => {
    const trimmedValues = {
      userName: values.userName.trim(),
      email: values.email.trim(),
      passwordHash: values.passwordHash,
      studentConfirmPassword: values.studentConfirmPassword,
    };
    console.log("Form data", trimmedValues);
    localStorage.setItem("signupData", JSON.stringify(trimmedValues));
    navigate("/information");
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
                userName: "",
                email: "",
                passwordHash: "",
                studentConfirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="head text-center">
                    <h1 className="fw-bold">Create Account</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adi, fugiat!</p>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputText" className="form-label">
                      Full name
                    </label>
                    <Field
                      type="text"
                      name="userName"
                      placeholder="Almhmdy ibrahim"
                      className="form-control"
                      id="exampleInputText"
                      aria-describedby="textHelp"
                    />
                    <ErrorMessage name="userName" component="h2" />
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
                        name="passwordHash"
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
                    <ErrorMessage name="passwordHash" component="h2" />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
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
                    <button type="submit" className="btn mb-3 fw-bold btn-one">
                      next
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

export default Signup;
