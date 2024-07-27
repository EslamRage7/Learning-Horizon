import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Information() {
  const navigate = useNavigate();
  const apiUrl = "http://medicalapi.runasp.net/Api/SignUp";

  const validationSchema = Yup.object().shape({
    userCountry: Yup.string().trim().required("Country is required"),
    userUniversity: Yup.string().trim().required("University name is required"),
    userMajor: Yup.string().trim().required("University major is required"),
    userAcademicYear: Yup.string().trim().required("Academic year is required"),
    userGraduationYear: Yup.string().required("Graduation year is required"),
  });

  const handleSubmit = async (values) => {
    const signupData = JSON.parse(localStorage.getItem("signupData"));
    const payload = {
      ...signupData,
      userCountry: values.userCountry.trim(),
      userUniversity: values.userUniversity.trim(),
      userMajor: values.userMajor.trim(),
      userAcademicYear: values.userAcademicYear.trim(),
      userGraduationYear: values.userGraduationYear.trim(),
    };

    console.log("Payload:", JSON.stringify(payload, null, 2));
    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response data", response.data);

      if (response.data.message === "Student Added successfully") {
        const studentName = response.data.studentName;
        localStorage.setItem("studentName", studentName);
        navigate("/home");
      } else {
        console.error("Registration failed", response.data.message);
      }
    } catch (error) {
      console.error("Error registering", error.response || error);
    }
  };

  return (
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
            userCountry: "",
            userUniversity: "",
            userMajor: "",
            userAcademicYear: "",
            userGraduationYear: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="head text-center">
                <h1 className="fw-bold info-head">Information About You</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adi, fugiat!</p>
              </div>
              <div className="d-flex justify-content-between align-items-center information">
                <div className="mb-3">
                  <label htmlFor="exampleInputText" className="form-label">
                    Your country
                  </label>
                  <Field
                    type="text"
                    name="userCountry"
                    placeholder="Egypt - Mansoura"
                    className="form-control"
                    id="exampleInputText"
                    aria-describedby="textHelp"
                  />
                  <ErrorMessage name="userCountry" component="h2" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputText1" className="form-label">
                    University name
                  </label>
                  <Field
                    type="text"
                    name="userUniversity"
                    placeholder="Mansoura University"
                    className="form-control"
                    id="exampleInputText1"
                    aria-describedby="textHelp"
                  />
                  <ErrorMessage name="userUniversity" component="h2" />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center information">
                <div className="mb-3">
                  <label htmlFor="exampleInputText2" className="form-label">
                    University major
                  </label>
                  <Field
                    type="text"
                    name="userMajor"
                    placeholder="Surgery"
                    className="form-control"
                    id="exampleInputText2"
                    aria-describedby="textHelp"
                  />
                  <ErrorMessage name="userMajor" component="h2" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputText3" className="form-label">
                    Academic year
                  </label>
                  <Field
                    type="text"
                    name="userAcademicYear"
                    placeholder="6D"
                    className="form-control"
                    id="exampleInputText3"
                    aria-describedby="textHelp"
                  />
                  <ErrorMessage name="userAcademicYear" component="h2" />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputText4" className="form-label">
                  Graduation year
                </label>
                <Field
                  type="date"
                  name="userGraduationYear"
                  maxLength="4"
                  className="form-control"
                  id="exampleInputText4"
                  aria-describedby="textHelp"
                />
                <ErrorMessage name="userGraduationYear" component="h2" />
              </div>
              <div className="btns text-center">
                <button type="submit" className="btn mb-3 fw-bold btn-one">
                  create
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Information;
