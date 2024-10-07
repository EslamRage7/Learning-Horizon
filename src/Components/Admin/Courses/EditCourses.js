import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditCourses() {
  document.title = "Edit Course";

  let { courseID } = useParams();
  const navigate = useNavigate();

  const [courseTittle, setCourseTittle] = useState("");
  const [courseCreator, setCourseCreator] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const api_url_get = `https://learning-horizon-server.premiumasp.net/Api/Course/GetAllCourses`;
  const api_url_put = `https://learning-horizon-server.premiumasp.net/Api/Course?id=${courseID}`;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCourseImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    axios
      .get(api_url_get)
      .then((response) => {
        const course = response.data.find(
          (c) => c.courseId === parseInt(courseID)
        );
        if (course) {
          setCourseTittle(course.courseTittle || "");
          setCourseCreator(course.courseCreator || "");
          setCoursePrice(course.coursePrice || "0");
          setImagePreview(course.courseImagePath || null);
        } else {
        }
      })
      .catch((error) => {});
  }, [courseID]);

  const formSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      customClass: {
        popup: "custom-swal",
      },
    }).then((data) => {
      if (data.isConfirmed) {
        setLoading(true);
        axios
          .put(
            api_url_put,
            { courseTittle, courseCreator, coursePrice, courseImage },
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
          )
          .then(() => {
            Swal.fire({
              text: "Your course updated successfully!",
              icon: "success",
              customClass: {
                popup: "custom-swal",
              },
            }).then(() => {
              navigate("/admin/lessons");
            });
          })
          .catch((error) => {})
          .finally(() => {
            setLoading(false);
            setUploadProgress(0);
          });
      } else if (data.isDenied) {
        Swal.fire({
          title: "info",
          text: "Changes are not saved",
          icon: "info",
          customClass: {
            popup: "custom-swal",
          },
        });
      }
    });
  };

  const handleBackClick = () => {
    Swal.fire({
      title: "Do you want to continue?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
      customClass: {
        popup: "custom-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin/lessons");
      }
    });
  };

  return (
    <div className="update">
      <h1 className="mb-5 pills-head pills-head-table">Edit Course</h1>
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
        <form onSubmit={formSubmit} className="p-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="mb-3">
                  <label htmlFor="courseTittle" className="form-label">
                    Course Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="courseTittle"
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
                  <label htmlFor="coursePrice" className="form-label">
                    Course Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="coursePrice"
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
                  <label htmlFor="courseCreator" className="form-label">
                    Course Creator
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="courseCreator"
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
                    onChange={handleImageChange}
                    className="form-control file ps-3"
                    type="file"
                    id="formFile"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-thumbnail Preview"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start align-items-center">
            <button type="submit" className="btn btn-success add me-3">
              Update
            </button>
            <button
              type="button"
              className="btn back add"
              onClick={handleBackClick}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourses;
