import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditVideos() {
  document.title = "Edit Videos";
  const { lessonsID } = useParams();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [lessonTittle, setLessonTittle] = useState("");
  const [lessonOrderInCourse, setLessonOrderInCourse] = useState("");
  const [lessonIsFree, setLessonIsFree] = useState(true);
  const [lessonPath, setLessonPath] = useState(null);
  const [courseTittle, setCourseTittle] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const apiCourses = `https://learning-horizon-server.premiumasp.net/Api/Course/GetAllCourses`;
  const api_url_get = `https://learning-horizon-server.premiumasp.net/Api/Lesson/GetLessonById?id=${lessonsID}`;
  const api_put = `https://learning-horizon-server.premiumasp.net/Api/Lesson?id=${lessonsID}`;

  useEffect(() => {
    axios.get(apiCourses).then((res) => {
      setCourses(res.data);
    });

    axios
      .get(api_url_get)
      .then((res) => {
        const data = res.data;
        setLessonTittle(data.lessonTittle);
        setLessonOrderInCourse(data.lessonOrderInCourse);
        setLessonIsFree(data.lessonIsFree);
        setCourseTittle(data.courseTittle);
        setLessonPath(data.lessonPath);
      })
      .catch((error) => {});
  }, [lessonsID, apiCourses, api_url_get]);

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setCourseTittle(selectedCourse);
    setErrors((prevErrors) => ({
      ...prevErrors,
      courseTittle: "",
    }));
  };

  const handleFreeOrPremiumChange = (e) => {
    const value = e.target.value;
    setLessonIsFree(value === "true");
    if (value === "true") {
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLessonPath(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!lessonTittle) newErrors.lessonTittle = "Title is required";
    if (!lessonOrderInCourse)
      newErrors.lessonOrderInCourse = "Order is required";
    if (!courseTittle) newErrors.courseTittle = "Course is required";
    if (!lessonPath && !lessonIsFree)
      newErrors.lessonPath = "Video is required";
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
      customClass: {
        popup: "custom-swal",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        formData.append("lessonTittle", lessonTittle);
        formData.append("lessonOrderInCourse", lessonOrderInCourse);
        formData.append("lessonIsFree", lessonIsFree);
        formData.append("courseTittle", courseTittle);

        if (lessonPath && lessonPath instanceof File) {
          formData.append("lessonFile", lessonPath);
        }

        try {
          await axios.put(api_put, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          });

          Swal.fire({
            title: "Done",
            text: "Your lesson updated successfully",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              popup: "custom-swal",
            },
          }).then(() => {
            navigate("/admin/lessons");
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `An error occurred: ${
              error.response ? error.response.data : error.message
            }`,
            icon: "error",
            customClass: {
              popup: "custom-swal",
            },
          });
        } finally {
          setLoading(false);
          setUploadProgress(0);
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: "Info",
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
      <h1 className="mb-5 pills-head pills-head-table">Edit Videos</h1>
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
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="mb-3">
                <label htmlFor="Title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Title"
                  value={lessonTittle || ""}
                  onChange={(e) => {
                    setLessonTittle(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      lessonTittle: "",
                    }));
                  }}
                />
                {errors.lessonTittle && (
                  <div className="text-danger">{errors.lessonTittle}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="Course" className="form-label">
                  Course
                </label>
                <select
                  className="form-control"
                  id="Course"
                  value={courseTittle || ""}
                  onChange={handleCourseChange}
                >
                  <option value="">Select a Course</option>
                  {courses.map((course) => (
                    <option key={course.courseId} value={course.courseTittle}>
                      {course.courseTittle}
                    </option>
                  ))}
                </select>
                {errors.courseTittle && (
                  <div className="text-danger">{errors.courseTittle}</div>
                )}
              </div>
              <div className="mb-3 d-flex align-items-center">
                <div className="me-4 d-flex align-items-center">
                  <input
                    type="radio"
                    id="Free"
                    name="lessonIsFree"
                    value="true"
                    checked={lessonIsFree === true}
                    onChange={handleFreeOrPremiumChange}
                  />
                  <label htmlFor="Free" className="ms-2">
                    Free
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="Premium"
                    name="lessonIsFree"
                    value="false"
                    checked={lessonIsFree === false}
                    onChange={handleFreeOrPremiumChange}
                  />
                  <label htmlFor="Premium" className="ms-2">
                    Premium
                  </label>
                </div>
                {errors.lessonIsFree && (
                  <div className="text-danger">{errors.lessonIsFree}</div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="mb-3">
                <label htmlFor="LessonOrder" className="form-label">
                  Lesson Order
                </label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  id="LessonOrder"
                  value={lessonOrderInCourse}
                  onChange={(e) => {
                    setLessonOrderInCourse(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      lessonOrderInCourse: "",
                    }));
                  }}
                />
                {errors.lessonOrderInCourse && (
                  <div className="text-danger">
                    {errors.lessonOrderInCourse}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Video
                </label>
                <input
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="form-control file ps-3"
                  type="file"
                  id="formFile"
                />
                {errors.lessonPath && (
                  <div className="text-danger">{errors.lessonPath}</div>
                )}
              </div>
              {lessonPath && lessonPath instanceof File && (
                <div className="mb-3">
                  <ul className="list-unstyled">
                    <li className="mt-3">
                      <video width="100" controls>
                        <source
                          src={URL.createObjectURL(lessonPath)}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </li>
                  </ul>
                </div>
              )}
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

export default EditVideos;
