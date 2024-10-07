import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FilterCourses from "../Users/FilterCourses";

function UsersTable() {
  const api_url = "https://learning-horizon-server.premiumasp.net/Api/User";

  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

  const deleteUser = (userId, firstName, lastName) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        popup: "custom-swal",
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        html: `<p style="font-weight: bold;">You won't be able to revert this! Do you want to remove <span style="color: red; font-weight: bold;">${firstName} ${lastName}</span>?</p>`,
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
            `https://learning-horizon-server.premiumasp.net/Api/User?id=${userId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => {
              if (!res.ok) {
                return res.text().then((text) => {
                  throw new Error(`Network response was not ok: ${text}`);
                });
              }
              return res.text();
            })
            .then(() => {
              getData();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                html: `<p style="font-weight: bold;">${firstName} ${lastName} has been deleted</p>`,
                icon: "success",
                customClass: {
                  popup: "custom-swal",
                },
              });
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                html: `<p style="font-weight: bold;">There was an error deleting <span style="color: red; font-weight: bold;">${firstName} ${lastName}</span>: ${error.message}</p>`,
                icon: "error",
                customClass: {
                  popup: "custom-swal",
                },
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            html: `<p style="font-weight: bold;"><span style="color: #007bff; font-weight: bold;">${firstName} ${lastName}</span> is safe</p>`,
            icon: "error",
            customClass: {
              popup: "custom-swal",
            },
          });
        }
      });
  };

  const groupedUsers = users.reduce((acc, user) => {
    const firstLetter = user.firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  const allUsers = users.length;

  return (
    <>
      <FilterCourses />
      <div className="mb-3 mt-5 ">
        <h3 className="total">Total Users: {allUsers}</h3>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">City</th>
              <th scope="col">University</th>
              <th scope="col">Major</th>
              <th scope="col">Academic</th>
              <th scope="col">Found Us</th>
              <th scope="col">Graduation</th>
              <th scope="col">Course</th>
              <th scope="col">Operation</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(groupedUsers).map((letter, index) => (
              <React.Fragment key={letter}>
                <tr>
                  <td
                    colSpan="15"
                    style={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
                  >
                    {letter}
                  </td>
                </tr>
                {groupedUsers[letter].map((user, userIndex) => (
                  <tr key={user.id}>
                    <td>{userIndex + 1}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.country}</td>
                    <td>
                      {user.city.startsWith("al-")
                        ? user.city.replace("al-", " ")
                        : user.city}
                    </td>
                    <td>{user.university}</td>
                    <td>{user.major}</td>
                    <td>{user.academicYear}</td>
                    <td>
                      {user.howDidYouKnowUs ? user.howDidYouKnowUs : "Empty"}
                    </td>
                    <td className="year">{user.graduationYear}</td>
                    <td>
                      {user.userCourses && user.userCourses.length > 0
                        ? user.userCourses.map((course, courseId) => (
                            <div className="mb-3" key={courseId}>
                              {course.courseTitle}
                            </div>
                          ))
                        : "No Courses"}
                    </td>
                    <td>
                      <button
                        className="operation btn btn-danger mt-1 btn-sm"
                        onClick={() =>
                          deleteUser(user.id, user.firstName, user.lastName)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {index < Object.keys(groupedUsers).length - 1 && (
                  <tr>
                    <td colSpan="9">
                      <div style={{ margin: "20px 0" }}></div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UsersTable;
