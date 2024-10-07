import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddCourses() {
  const [courseTittle, setCourseTittle] = useState("");
  const [courseCreator, setCourseCreator] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseImage, setCourseImage] = useState(null);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!courseTittle) newErrors.courseTittle = "Title is required";
    if (!courseCreator) newErrors.courseCreator = "Creator is required";
    if (!coursePrice) newErrors.coursePrice = "Price is required";
    if (!courseImage) newErrors.courseImage = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      const formData = new FormData();
      formData.append("courseTittle", courseTittle);
      formData.append("courseCreator", courseCreator);
      formData.append("coursePrice", coursePrice);
      formData.append("courseDescription", courseDescription);
      if (courseImage) {
        formData.append("courseImage", courseImage);
      }

      try {
        const response = await axios.post(
          "https://learning-horizon-server.premiumasp.net/Api/Course",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          }
        );

        Swal.fire({
          title: "Done",
          text: "Your course uploaded successfully",
          icon: "success",
          customClass: {
            popup: "custom-swal",
          },
        });

        setCourseTittle("");
        setCourseCreator("");
        setCourseDescription("");
        setCoursePrice("");
        setCourseImage(null);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "An error occurred while uploading the Section.",
          icon: "error",
          customClass: {
            popup: "custom-swal",
          },
        });
      } finally {
        setLoading(false);
        setUploadProgress(0);
      }
    }
  };

  return (
    <>
      <div className="admin">
        {loading && (
          <div className="loading-overlay text-center">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="spinner"></div>
              <div className="progress mt-3" style={{ width: "100%" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${uploadProgress}%` }}
                  aria-valuenow={uploadProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {uploadProgress}%
                </div>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={formSubmit}>
          <h1 className="mb-lg-5 mb-4 pills-head text-center">
            Details Courses
          </h1>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="mb-3">
                <label htmlFor="tittle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tittle"
                  value={courseTittle}
                  onChange={(e) => {
                    setCourseTittle(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      courseTittle: "",
                    }));
                  }}
                />
                {errors.courseTittle && (
                  <div className="text-danger">{errors.courseTittle}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="price"
                  value={coursePrice}
                  onChange={(e) => {
                    setCoursePrice(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      coursePrice: "",
                    }));
                  }}
                />
                {errors.coursePrice && (
                  <div className="text-danger">{errors.coursePrice}</div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="mb-3">
                <label htmlFor="Creator" className="form-label">
                  Creator
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Creator"
                  value={courseCreator}
                  onChange={(e) => {
                    setCourseCreator(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      courseCreator: "",
                    }));
                  }}
                />
                {errors.courseCreator && (
                  <div className="text-danger">{errors.courseCreator}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label ">
                  Image
                </label>
                <input
                  accept="image/*"
                  onChange={(e) => setCourseImage(e.target.files[0])}
                  className="form-control file ps-3"
                  type="file"
                  id="formFile"
                />
                {errors.courseImage && (
                  <div className="text-danger">{errors.courseImage}</div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-success add m-auto ">
              Publish now
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddCourses;
