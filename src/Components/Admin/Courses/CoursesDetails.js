import "../css/view.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CoursesDetails() {
  let { courseID } = useParams();
  const [course, setCourse] = useState([]);
  const api_url_get = `https://learning-horizon-server.premiumasp.net/Api/Course/GetCourseById?id=${courseID}`;

  useEffect(() => {
    fetch(api_url_get)
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }, [courseID]);

  const bookImageUrl = `https://learning-horizon-server.premiumasp.net/Api/Book/GetBookFile?path=${course.courseImagePath}`;
  return (
    <div className="details">
      <div className="container">
        <h1 className="head mt-5 mb-5">Course Details</h1>
        <div className="row text-center">
          <div className="col-12">
            <div className="element text-center">
              <img
                className="img-fluid mb-3 mt-3 img-thumbnail"
                src={bookImageUrl}
                alt={course.courseTittle}
              />
              {course ? (
                <div className="box text-center p-4 mb-3">
                  <div className="mb-2">
                    <span className="span-head">Title Course:</span>
                    <span className="span-body text-black-50">
                      {course.courseTittle || "N/A"}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="span-head">Course Creator:</span>
                    <span className="span-body text-black-50">
                      {course.courseCreator || "N/A"}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="span-head">Price:</span>
                    <span className="span-body text-black-50">
                      {course.coursePrice === 0
                        ? "Free"
                        : course.coursePrice || "N/A"}
                    </span>
                  </div>
                  <Link className="text-start btn mt-4" to="/admin/lessons">
                    Back to Admin Page
                  </Link>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesDetails;
