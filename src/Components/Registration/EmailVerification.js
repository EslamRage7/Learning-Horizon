import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import code from "../images/confirm_code.png";
import emailVerification from "../images/email_verification.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useRef, useEffect } from "react";
import CryptoJS from "crypto-js";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EmailVerification() {
  const navigate = useNavigate();
  const verificationCodeRef = useRef(null);

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

  const validationSchema = Yup.object().shape({
    verificationCode: Yup.string()
      .required("*Verification code is required")
      .trim(),
  });

  const secretKey = "e#J8zL5$e2f!v9@k8U%tR6^wO4z&Q3m*J9bL$7yP8";

  const decryptData = (encryptedData) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  };

  const handleVerification = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const signupData = localStorage.getItem("signupData");
    const encryptedStoredCode = localStorage.getItem("code");

    if (!signupData || !encryptedStoredCode) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No signup data or verification code found. Please register again.",
        customClass: {
          popup: "custom-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup");
        }
      });
      setSubmitting(false);
      return;
    }

    const storedCodeString = decryptData(encryptedStoredCode);
    if (!storedCodeString) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to decrypt verification code.",
        customClass: {
          popup: "custom-swal",
        },
      });
      setSubmitting(false);
      return;
    }

    const storedCode = storedCodeString;

    if (values.verificationCode.trim() === storedCode) {
      Swal.fire({
        position: "center",
        title: "Email verified successfully!",
        text: "You will be redirected to complete your profile.",
        imageHeight: 100,
        imageWidth: 100,
        imageUrl: emailVerification,
        confirmButtonText: "Continue",
        customClass: {
          popup: "custom-swal",
        },
      }).then((res) => {
        if (res.isConfirmed) {
          localStorage.removeItem("code");
          navigate("/information");
        }
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

    setSubmitting(false);
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
            verificationCode: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleVerification}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="head text-center">
                <h1 className="fw-bold info-head mb-4">Email Verification</h1>
                <p>Please enter the verification code sent to your email.</p>
              </div>
              <div className="text-center mb-3">
                <img src={code} className="img-fluid lock" alt="code" />
              </div>
              <div className="mb-3">
                <label htmlFor="verificationCode" className="form-label">
                  Verification Code
                </label>
                <Field
                  type="text"
                  maxLength="6"
                  name="verificationCode"
                  placeholder="Enter your code"
                  className="form-control"
                  id="verificationCode"
                  innerRef={verificationCodeRef}
                />
                <ErrorMessage name="verificationCode" component="p" />
              </div>
              <div className="btns text-center">
                <button
                  type="submit"
                  className="btn mb-3 fw-bold btn-one"
                  disabled={isSubmitting}
                >
                  Verify
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default EmailVerification;
