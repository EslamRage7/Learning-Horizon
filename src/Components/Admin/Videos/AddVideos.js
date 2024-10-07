import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddVideos() {
  const [courses, setCourses] = useState([]);

  const [lessonTittle, setLessonTittle] = useState("");
  const [lessonOrderInCourse, setLessonOrderInCourse] = useState("");
  const [lessonIsFree, setLessonIsFree] = useState(true);
  const [lessonFile, setLessonFile] = useState([]);
  const [courseTittle, setCourseTittle] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://learning-horizon-server.premiumasp.net/Api/Course/GetAllCourses"
      )
      .then((res) => setCourses(res.data));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!lessonTittle) newErrors.lessonTittle = "Title is required";
    if (!lessonOrderInCourse)
      newErrors.lessonOrderInCourse = "Order is required";
    if (lessonFile.length === 0)
      newErrors.video = "At least one video is required for paid lessons";
    if (!courseTittle) newErrors.courseTittle = "Course is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFreeOrPremiumChange = (e) => {
    const value = e.target.value === "true";
    setLessonIsFree(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      lessonIsFree: "",
    }));
    if (value === true) {
      setPrice("");
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const formData = new FormData();
      formData.append("lessonTittle", lessonTittle);
      formData.append("lessonOrderInCourse", lessonOrderInCourse);
      formData.append("courseTittle", courseTittle);
      formData.append("lessonIsFree", lessonIsFree);
      formData.append("lessonFile", lessonFile);
      try {
        const response = await axios.post(
          "https://learning-horizon-server.premiumasp.net/Api/Lesson",
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
          text: "Your lesson uploaded successfully",
          icon: "success",
          customClass: {
            popup: "custom-swal",
          },
        });

        setLessonTittle("");
        setLessonOrderInCourse("");
        setLessonFile([]);
        setCourseTittle("");
        setLessonIsFree(true);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "An error occurred while uploading the lesson.",
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
            Details Videos
          </h1>
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
                  value={lessonTittle}
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
                  value={courseTittle}
                  onChange={(e) => {
                    setCourseTittle(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      courseTittle: "",
                    }));
                  }}
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
                    id="payed"
                    name="lessonIsFree"
                    value="false"
                    checked={lessonIsFree === false}
                    onChange={handleFreeOrPremiumChange}
                  />
                  <label htmlFor="payed" className="ms-2">
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
                  className="form-control"
                  min="1"
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
                <label htmlFor="formFile" className="form-label ">
                  video
                </label>
                <input
                  accept="video/*"
                  onChange={(e) => setLessonFile(e.target.files[0])}
                  className="form-control file ps-3"
                  type="file"
                  id="formFile"
                />
                {errors.lessonFile && (
                  <div className="text-danger">{errors.lessonFile}</div>
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
export default AddVideos;
