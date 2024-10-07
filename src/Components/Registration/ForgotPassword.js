import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import lock from "../images/lock.png";
import Loader from "./loader";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";

function ForgotPassword() {
  const apiUrl = `https://learning-horizon-server.premiumasp.net/Api/Account/forgot-password`;
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const verificationCodeRef = useRef(null);

  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", preventContextMenu);

    setLoading(false);

    const focusInput = setTimeout(() => {
      if (verificationCodeRef.current) {
        verificationCodeRef.current.focus();
      }
    }, 0);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      clearTimeout(focusInput);
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
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        apiUrl,
        { email: values.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "An email with the code has been sent. Please check your inbox.",
          confirmButtonText: "Continue",
          customClass: {
            popup: "custom-swal",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("Passcode", response.data);
            navigate("/confirmCode");
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response
          ? error.response.data
          : "An unexpected error occurred. Please try again.",
        confirmButtonText: "Retry",
        customClass: {
          popup: "custom-swal",
        },
      });
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
              <img src={books} className="img-fluid" alt="books" />
            </div>
            <div className="heal">
              <img src={heal} className="img-fluid heal" alt="heal" />
            </div>
          </div>
          <div className="all">
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <h1 className="fw-bold mb-4">Password Recovery</h1>
                  <div className="text-center mb-3">
                    <img src={lock} className="img-fluid lock" alt="lock" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      innerRef={verificationCodeRef}
                      name="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    <ErrorMessage name="email" component="p" />
                    {emailError && <p className="text-danger">{emailError}</p>}
                  </div>
                  <div className="btns text-center">
                    <button
                      type="submit"
                      className="btn mb-2 fw-bold btn-one"
                      disabled={isSubmitting}
                    >
                      Next
                    </button>
                    <br />
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

export default ForgotPassword;
