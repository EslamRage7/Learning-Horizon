import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const api_url = `https://learning-horizon-server.premiumasp.net/Api/Course/GetAllCourses`;

  const getData = () => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteCourse = (courseId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
        popup: "custom-swal",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
          popup: "custom-swal",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`https://learning-horizon-server.premiumasp.net/Api/Course`, {
            body: JSON.stringify({ id: courseId }),
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) {
                return res.text().then((text) => {
                  throw new Error(`Network response was not ok: ${text}`);
                });
              }
            })
            .then((text) => {
              if (text) {
              }
              getData();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your section has been deleted.",
                icon: "success",
                customClass: {
                  popup: "custom-swal",
                },
              });
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: `There was an error deleting the section: ${error.message}`,
                icon: "error",
                customClass: {
                  popup: "custom-swal",
                },
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your section is safe :)",
            icon: "error",
            customClass: {
              popup: "custom-swal",
            },
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Course Name</th>
              <th scope="col">Course Creator</th>
              <th scope="col">Course Price</th>

              {/* <th scope="col">Course lessons</th> */}
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.courseId}>
                <td>{index + 1}</td>
                <td>{course.courseTittle}</td>
                <td>{course.courseCreator}</td>
                <td>{course.coursePrice}</td>
                {/* <td>{course.lessons === "" ? course.lessons : "empty"}</td> */}
                <td>
                  <button
                    className="operation btn btn-danger btn-sm me-2 mb-2"
                    onClick={() => deleteCourse(course.courseId)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/courses/${course.courseId}`}
                    className="operation btn btn-info btn-sm me-2 mb-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/courses/edit/${course.courseId}`}
                    className="operation btn btn-primary btn-sm mb-2"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CoursesTable;
