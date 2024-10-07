import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function VideosTable() {
  const [lessons, setLessons] = useState([]);

  const lessonsApiUrl = `https://learning-horizon-server.premiumasp.net/Api/Lesson/GetAllLessons`;

  const getData = () => {
    fetch(lessonsApiUrl)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          const courseComparison = a.courseTittle.localeCompare(b.courseTittle);
          if (courseComparison !== 0) {
            return courseComparison;
          }
          return a.lessonOrderInCourse - b.lessonOrderInCourse;
        });
        setLessons(sortedData);
      });
  };

  const deleteLessons = (lessonId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
        customClass: {
          popup: "custom-swal",
        },
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
          fetch(
            `https://learning-horizon-server.premiumasp.net/Api/Lesson?id=${lessonId}`,
            {
              method: "DELETE",
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error(
                  `Network response was not ok: ${res.statusText}`
                );
              }
              return res.json();
            })
            .then(() => {
              getData();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                customClass: {
                  popup: "custom-swal",
                },
              });
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: `There was an error deleting the file: ${error.message}`,
                icon: "error",
                customClass: {
                  popup: "custom-swal",
                },
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
            customClass: {
              popup: "custom-swal",
            },
          });
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderLessons = () => {
    let lastCourseTitle = "";
    let lessonIndex = 1;
    return lessons.map((lesson, index) => {
      const shouldAddSpace = lesson.courseTittle !== lastCourseTitle;
      if (shouldAddSpace) {
        lessonIndex = 1;
      }
      lastCourseTitle = lesson.courseTittle;
      return (
        <React.Fragment key={lesson.lessonId}>
          {shouldAddSpace && index !== 0 && (
            <tr style={{ height: "50px" }}></tr>
          )}
          <tr>
            <td>{lessonIndex++}</td>
            <td>{lesson.lessonTittle}</td>
            <td>{lesson.lessonOrderInCourse}</td>
            <td>{lesson.lessonIsFree ? "Free" : "Premium"}</td>
            <td>{lesson.courseTittle}</td>
            <td>
              <button
                className="operation btn btn-danger btn-sm me-2 mb-2"
                onClick={() => deleteLessons(lesson.lessonId)}
              >
                Delete
              </button>
              <Link
                to={`/admin/lessons/${lesson.lessonId}`}
                className="operation btn btn-info btn-sm me-2 mb-2"
              >
                View
              </Link>
              <Link
                to={`/admin/lessons/edit/${lesson.lessonId}`}
                className="operation btn btn-primary btn-sm mb-2"
              >
                Edit
              </Link>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };

  const allLessons = lessons.length;
  return (
    <div className="container">
      <div className="table-responsive">
        <div className="mb-5">
          <h3 className="">Total Lessons: {allLessons}</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Lesson Title</th>
              <th scope="col">Lesson Order</th>
              <th scope="col">Type</th>
              <th scope="col">Course</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>{renderLessons()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default VideosTable;
