import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function SectionsTable() {
  const [sections, setSections] = useState([]);
  const api_url = "https://learning-horizon-server.premiumasp.net/Api/Section";

  const getData = () => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => setSections(data));
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteSection = (sectionId) => {
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
            `https://learning-horizon-server.premiumasp.net/Api/Section?id=${sectionId}`,
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
              <th scope="col">Section Name</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, index) => (
              <tr key={section.sectionId}>
                <td>{index + 1}</td>
                <td>{section.sectionTittle}</td>
                <td>
                  <button
                    className="operation btn btn-danger btn-sm me-2 mb-2"
                    onClick={() => deleteSection(section.sectionId)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/sections/edit/${section.sectionId}`}
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

export default SectionsTable;
