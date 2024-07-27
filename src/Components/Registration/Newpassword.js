import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import newpass from "../images/newpass.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Newpassword() {
  const apiUrl = "http://medicalapi.runasp.net/Api/Account/reset-password";

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    const userEmail = JSON.parse(localStorage.getItem("userEmail"));

    const payload = {
      email: userEmail.email,
      token: userEmail.token,
      newPassword: values.newPassword,
    };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data && response.data.success) {
        navigate("/home");
      } else {
        setErrorMessage(response.data.message || "Error resetting password.");
      }
    } catch (error) {
      setErrorMessage("Error resetting password.");
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
          initialValues={{
            newPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="">
              <h1 className="fw-bold">Reset Password</h1>
              <div className="text-center">
                <img src={newpass} className="img-fluid lock" alt="lock" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  New Password
                </label>
                <div className="password">
                  <Field
                    placeholder="......"
                    name="newPassword"
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
                <ErrorMessage name="newPassword" component="p" />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="btns text-center">
                <button type="submit" className="btn mb-2 fw-bold btn-one">
                  Confirm New Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Newpassword;
