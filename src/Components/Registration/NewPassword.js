import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import newpass from "../images/newpass.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

function NewPassword() {
  const apiUrl = `https://learning-horizon-server.premiumasp.net/Api/Account/reset-password`;

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

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
      .trim()
      .required("*Email is required"),
    password: Yup.string()
      .min(6, "*Password must be at least 6 characters")
      .required("*Password is required"),
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(apiUrl, {
        email: values.email.trim(),
        password: values.password,
      });
      if (response.data === "Password has been reset successfully") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Password successfully reset.",
          confirmButtonText: "Got it",
          text: "Your password is now reset. Redirecting to login page",
          customClass: {
            popup: "custom-swal",
          },
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/login");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data || "Error resetting password.",
          customClass: {
            popup: "custom-swal",
          },
        });
        setErrorMessage(response.data || "Error resetting password.");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Error resetting password.",
        customClass: {
          popup: "custom-swal",
        },
      });
      setErrorMessage(
        error.response?.data?.message || "Error resetting password."
      );
    }
  };

  return (
    <>
      <div className="moving">
        <div className="books">
          <img src={books} className="img-fluid" alt="books" />
        </div>
        <div className="heal">
          <img src={heal} className="img-fluid heal" alt="heal" />
        </div>
      </div>
      <div className="all">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <h1 className="fw-bold mb-4">Reset Password</h1>
            <div className="text-center mb-3">
              <img src={newpass} className="img-fluid lock" alt="lock" />
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
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password
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

            <div className="btns text-center">
              <button type="submit" className="btn mb-2 fw-bold btn-one">
                Confirm New Password
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default NewPassword;
