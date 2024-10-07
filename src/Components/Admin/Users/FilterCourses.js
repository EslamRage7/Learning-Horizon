import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function FilterCourses() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const api_url = "https://learning-horizon-server.premiumasp.net/Api/User";
  const api_courses =
    "https://learning-horizon-server.premiumasp.net/Api/Course/GetAllCourses";

  const getData = () => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        const sortedUsers = data.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        setUsers(sortedUsers);
      });
  };

  const getCourses = () => {
    fetch(api_courses)
      .then((res) => res.json())
      .then((data) => setCourses(data));
  };

  useEffect(() => {
    getData();
    getCourses();
  }, []);

  const handleUserSelection = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);

    const user = users.find((user) => user.id === userId);

    if (user) {
      const courseIds = user.userCourses.map((course) => course.courseId);
      setSelectedCourses(courseIds);
    } else {
      setSelectedCourses([]);
    }
  };

  const handleCourseSelection = (e, courseId) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedCourses((prev) => [...prev, courseId]);
    } else {
      setSelectedCourses((prev) => prev.filter((id) => id !== courseId));
    }
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
      popup: "custom-swal",
    },
    buttonsStyling: false,
  });

  const deleteCourse = async () => {
    if (!selectedUser || selectedCourses.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Select a user and at least one course to delete",
        customClass: {
          popup: "custom-swal",
        },
      });
      return;
    }

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
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              `https://learning-horizon-server.premiumasp.net/Api/User/DeleteCourseFromUser?userId=${encodeURIComponent(
                selectedUser
              )}`,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                data: new URLSearchParams({
                  courseIds: selectedCourses.join(","),
                }),
              }
            );

            swalWithBootstrapButtons.fire({
              icon: "success",
              title: "Course deleted successfully!",
              customClass: {
                popup: "custom-swal",
              },
            });

            setUsers((prevUsers) =>
              prevUsers.map((user) => {
                if (user.id === selectedUser) {
                  return {
                    ...user,
                    userCourses: user.userCourses.filter(
                      (course) => !selectedCourses.includes(course.courseId)
                    ),
                  };
                }
                return user;
              })
            );
          } catch (error) {
            console.error("Error deleting courses:", error);
            swalWithBootstrapButtons.fire({
              icon: "error",
              title: "Failed to delete courses",
              text: "Select one video",
              // text: error.response ? error.response.data : error.message,
              customClass: {
                popup: "custom-swal",
              },
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Courses are safe :)",
            icon: "error",
          });
        }
      });
  };

  const addCoursesToUser = () => {
    if (!selectedUser || selectedCourses.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Please select a user and at least one course to add",
        customClass: {
          popup: "custom-swal",
        },
      });
      return;
    }

    const formData = new FormData();
    selectedCourses.forEach((courseId) =>
      formData.append("courseIds", courseId)
    );

    axios
      .post(
        `https://learning-horizon-server.premiumasp.net/Api/User/AddCourseToUser?userId=${selectedUser}`,
        formData
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Course(s) added successfully!",
          customClass: {
            popup: "custom-swal",
          },
        });

        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user.id === selectedUser) {
              return {
                ...user,
                userCourses: [
                  ...user.userCourses,
                  ...selectedCourses.map((id) => ({ courseId: id })),
                ],
              };
            }
            return user;
          });
        });

        setSelectedCourses([]);
      })
      .catch((error) => {
        console.error("Error adding courses:", error);
        Swal.fire({
          icon: "error",
          title: error.response.data,
          customClass: {
            popup: "custom-swal",
          },
        });
      });
  };

  const handleSubmiting = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmiting}>
        <h1 className="mb-lg-5 mb-4 pills-head text-center">Handle Courses</h1>
        <div className="open-course">
          <select
            className="form-select mb-3"
            aria-label="Default select example"
            onChange={handleUserSelection}
            value={selectedUser || ""}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>

          {courses.map((course) => (
            <ul className="list-group" key={course.courseId}>
              <li className="list-group-item d-flex align-items-center mb-2">
                <input
                  className="me-2"
                  type="checkbox"
                  id={`course-${course.courseId}`}
                  value={course.courseId}
                  checked={selectedCourses.includes(course.courseId)}
                  onChange={(e) => handleCourseSelection(e, course.courseId)}
                />
                <label htmlFor={`course-${course.courseId}`}>
                  {course.courseTittle}
                </label>
              </li>
            </ul>
          ))}
          <div className=" text-center">
            <button
              type="button"
              className="operation btn btn-success mt-1 me-4 btn-sm"
              onClick={addCoursesToUser}
            >
              Add
            </button>

            <button
              type="button"
              className="operation btn btn-danger mt-1 btn-sm"
              onClick={deleteCourse}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FilterCourses;
