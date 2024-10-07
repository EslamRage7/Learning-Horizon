import "./css/registration.css";
import "./css/responsive-registration.css";
import books from "../images/books.png";
import heal from "../images/heal.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { getCities } from "country-city";

function Information() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();
  const apiUrl = `https://learning-horizon-server.premiumasp.net/Api/SignUp/create-async`;

  const validationSchema = Yup.object().shape({
    userCountry: Yup.string().trim().required("*Country is required"),
    userCity: Yup.string().trim().required("*City is required"),
    userUniversity: Yup.string()
      .trim()
      .required("*University name is required"),
    userGraduationYear: Yup.string().required("*Graduation year is required"),
    userMajor: Yup.string().trim().required("*University major is required"),
    userAcademicYear: Yup.string()
      .trim()
      .required("*Academic year is required"),

    // phoneNumber: Yup.string()
    //   .required("Phone number is required")
    //   .matches(/^[0-9]{10,15}$/, "Phone number is not valid"),
  });

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

  const countries = countryList().getData();

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const academicYearOptions = [
    { value: "1D", label: "1st Year" },
    { value: "2D", label: "2nd Year" },
    { value: "3D", label: "3rd Year" },
    { value: "4D", label: "4th Year" },
    { value: "5D", label: "5th Year" },
    { value: "Internship", label: "Internship Year" },
    { value: "Graduated", label: "Graduated" },
  ];
  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const signupData = JSON.parse(localStorage.getItem("signupData"));

    if (!values.howDidYouKnowUs) {
      values.howDidYouKnowUs = "Unknown";
    }

    const payload = {
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      email: signupData.email,
      password: signupData.password,
      userCountry: values.userCountry.trim(),
      userCity: values.userCity.trim(),
      userUniversity: values.userUniversity.trim(),
      userMajor: values.userMajor.trim(),
      userAcademicYear: values.userAcademicYear.trim(),
      userGraduationYear: values.userGraduationYear.trim(),
      howDidYouKnowUs: values.howDidYouKnowUs.trim(),
      // phoneNumber: values.phoneNumber.trim(),
    };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.message === "User registered successfully") {
        sessionStorage.setItem("isConnected", "true");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Account created successfully!",
          text: "Welcome to our community.",
          confirmButtonText: "Let's start",
          customClass: {
            popup: "custom-swal",
          },
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/home");
            localStorage.removeItem("signupData");
          }
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Registration Failed",
          customClass: {
            popup: "custom-swal",
          },
          text:
            response.data.message || "Registration failed. Please try again.",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.[0]?.description ||
        "An unexpected error occurred.";
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: errorMessage,
        showConfirmButton: true,
        customClass: {
          popup: "custom-swal",
        },
      });
    } finally {
      setSubmitting(false);
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
            userCountry: "",
            userCity: "",
            userUniversity: "",
            userMajor: "",
            userAcademicYear: "",
            userGraduationYear: "",
            howDidYouKnowUs: "",
            // phoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, isSubmitting, setFieldValue }) => (
            <Form>
              <div className="head text-center">
                <h1 className="fw-bold info-head"> About You</h1>
                <p>fill in your details to get started with your account!</p>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="mb-3">
                    <label htmlFor="userUniversity" className="form-label">
                      University name
                    </label>
                    <Field
                      type="text"
                      name="userUniversity"
                      placeholder="Cairo University"
                      className="form-control"
                      id="userUniversity"
                    />
                    <ErrorMessage name="userUniversity" component="p" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userMajor" className="form-label">
                      University major
                    </label>
                    <Field
                      type="text"
                      name="userMajor"
                      placeholder="Surgery"
                      className="form-control"
                      id="userMajor"
                    />
                    <ErrorMessage name="userMajor" component="p" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userAcademicYear" className="form-label">
                      Academic year
                    </label>
                    <Field className="form-control" name="userAcademicYear">
                      {({ field, form }) => (
                        <Select
                          placeholder="Select Academic Year"
                          id="userAcademicYear"
                          name="userAcademicYear"
                          options={academicYearOptions}
                          value={academicYearOptions.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(option) =>
                            form.setFieldValue("userAcademicYear", option.value)
                          }
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: "transparent",
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              color: state.isSelected ? "white" : "black",
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "white",
                            }),
                            placeholder: (provided) => ({
                              ...provided,
                              color: "#dfd3d3",
                              fontSize: "10px",
                            }),
                          }}
                        />
                      )}
                    </Field>
                    <ErrorMessage name="userAcademicYear" component="p" />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="mb-3">
                    <label htmlFor="userCountry" className="form-label">
                      Country
                    </label>
                    <Select
                      options={countries}
                      name="userCountry"
                      value={selectedCountry}
                      onChange={(selectedOption) => {
                        setSelectedCountry(selectedOption);
                        setFieldValue("userCountry", selectedOption.value);
                        const countryCities = getCities(selectedOption.label);
                        setCities(
                          countryCities.map((city) => ({
                            label: city,
                            value: city,
                          }))
                        );
                        setSelectedCity(null);
                      }}
                      placeholder="Select your country"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "transparent",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          color: state.isSelected ? "white" : "black",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "white",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: "#dfd3d3",
                          fontSize: "10px",
                        }),
                      }}
                    />
                    <ErrorMessage name="userCountry" component="p" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userCity" className="form-label">
                      City
                    </label>
                    <Select
                      options={cities}
                      value={selectedCity}
                      id="userCity"
                      name="userCity"
                      onChange={(selectedOption) => {
                        handleCityChange(selectedOption);
                        setFieldValue("userCity", selectedOption.value);
                      }}
                      placeholder="Select your city"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "transparent",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          color: state.isSelected ? "white" : "black",
                        }),
                        singleValue: (provided) => ({
                          ...provided,
                          color: "white",
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: "#dfd3d3",
                          fontSize: "10px",
                        }),
                      }}
                    />
                    <ErrorMessage name="userCity" component="p" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="userGraduationYear" className="form-label">
                      Graduation year
                    </label>
                    <Field
                      type="date"
                      name="userGraduationYear"
                      className="form-control"
                      id="userGraduationYear"
                    />
                    <ErrorMessage name="userGraduationYear" component="p" />
                  </div>
                </div>
              </div>

              {/* <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <Field name="phoneNumber">
                  {({ field, form }) => (
                    <PhoneInput
                      country={"eg"}
                      value={field.value}
                      onChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                      inputProps={{
                        name: "phoneNumber",
                        required: true,
                        className: "form-control",
                      }}
                    />
                  )}
                </Field>

                <ErrorMessage name="phoneNumber" component="p" />
              </div> */}

              <div className="mb-3">
                <label htmlFor="howDidYouKnowUs" className="form-label">
                  How did you know us? (optional)
                </label>
                <Field
                  as="textarea"
                  name="howDidYouKnowUs"
                  placeholder="Share with us how you found out about us"
                  className="form-control"
                  id="howDidYouKnowUs"
                  rows="2"
                />
              </div>

              <div className="btns text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn mb-3 fw-bold btn-one"
                >
                  Create
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
