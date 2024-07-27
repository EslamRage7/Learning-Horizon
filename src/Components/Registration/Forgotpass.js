import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import lock from "../images/lock.png";
import Loader from "./Preloader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Forgotpass() {
  const apiUrl = "http://medicalapi.runasp.net/Api/Account/forgot-password";
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
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
      localStorage.setItem(
        "userEmail",
        JSON.stringify({ email: values.email })
      );
      navigate("/newPassword");
    } catch (error) {
      console.error("Error logging in", error.response || error);
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
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ error, touched }) => (
                <Form className="">
                  <h1 className="fw-bold">Password Recovery</h1>
                  <div className="text-center">
                    <img src={lock} className="img-fluid lock " alt="lock" />
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
                  <div className="btns text-center">
                    <button type="submit" className="btn mb-2 fw-bold btn-one">
                      Send
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

export default Forgotpass;
