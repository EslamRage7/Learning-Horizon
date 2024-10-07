import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import code from "../images/confirm_code.png";
import emailVerification from "../images/email_verification.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useEffect, useRef } from "react";

function ConfirmCode() {
  const verificationCodeRef = useRef(null);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^\d{6}$/, "Code must be exactly 6 digits")
      .required("*Code is required"),
  });

  const storedCode = localStorage.getItem("Passcode");

  useEffect(() => {
    verificationCodeRef.current.focus();
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

  const handleSubmit = async (values) => {
    if (values.code.trim() === storedCode) {
      localStorage.setItem("isConnected", "true");
      Swal.fire({
        position: "center",
        title: "Email verified successfully!",
        text: "You will be redirected shortly.",
        imageHeight: 100,
        imageWidth: 100,
        imageUrl: emailVerification,
        showConfirmButton: false,
        customClass: {
          popup: "custom-swal",
        },
        timer: 3000,
      }).then(() => {
        localStorage.removeItem("Passcode");
        navigate("/newPassword");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "Incorrect verification code. Please try again.",
        customClass: {
          popup: "custom-swal",
        },
      });
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
          initialValues={{ code: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form className="all">
              <h1 className="fw-bold mb-4">Verify Your Email</h1>
              <div className="text-center mb-3">
                <img src={code} className="img-fluid lock" alt="code" />
              </div>
              <div className="mb-3">
                <label htmlFor="code" className="form-label">
                  Verification Code
                </label>
                <Field
                  type="text"
                  name="code"
                  innerRef={verificationCodeRef}
                  maxLength="6"
                  className="form-control"
                  id="code"
                  aria-describedby="codeHelp"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleChange(e);
                    e.target.value = value;
                  }}
                />
                <ErrorMessage name="code" component="p" />
              </div>
              <div className="btns text-center">
                <button type="submit" className="btn mb-2 fw-bold btn-one">
                  Submit Code
                </button>
                <br />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default ConfirmCode;
