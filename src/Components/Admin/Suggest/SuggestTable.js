import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function SuggestTable() {
  const [videos, setVides] = useState([]);
  const api_url = `https://learning-horizon-server.premiumasp.net/Api/Suggest`;

  const getData = () => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => setVides(data));
  };

  const deleteVideo = (id) => {
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
          fetch(
            `https://learning-horizon-server.premiumasp.net/Api/Suggest?id=${id}`,
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
            text: "Your file is safe :)",
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

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Video Name</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={video.id}>
                <td>{index + 1}</td>
                <td>
                  {/* {video.videoName.includes(".mp4")
                    ? video.videoName.replace(".mp4", "")
                    : video.videoName} */}
                  {video.videoName}
                </td>

                <td>
                  <button
                    className="operation btn btn-danger btn-sm me-2 mb-2"
                    onClick={() => deleteVideo(video.id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/suggest/edit/${video.id}`}
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
export default SuggestTable;
