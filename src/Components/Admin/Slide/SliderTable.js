import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function SliderTable() {
  const [images, setImages] = useState([]);

  const api_url = `https://learning-horizon-server.premiumasp.net/Api/Slider`;
  const getImage = `https://learning-horizon-server.premiumasp.net/Api/Lesson/GetLessonFile?path=`;

  const getData = async () => {
    try {
      const response = await fetch(api_url);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();

      setImages(data);
    } catch (error) {}
  };

  const deleteImage = async (id) => {
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

    try {
      const result = await swalWithBootstrapButtons.fire({
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
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `https://learning-horizon-server.premiumasp.net/Api/Slider?id=${id}`,
          {
            method: "DELETE",
          }
        );

        const contentType = response.headers.get("content-type");
        let responseData;

        if (contentType && contentType.includes("application/json")) {
          responseData = await response.json();
        } else {
          responseData = await response.text();
        }

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${responseData}`);
        }

        getData();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          customClass: {
            popup: "custom-swal",
          },
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
    } catch (error) {
      swalWithBootstrapButtons.fire({
        title: "Error!",
        text: `There was an error deleting the file: ${error.message}`,
        icon: "error",
        customClass: {
          popup: "custom-swal",
        },
      });
    }
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
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr key={image.id}>
                <td>{index + 1}</td>
                <td>{image.imageName}</td>
                <td>
                  <img
                    src={`${getImage}${image.imagePath}`}
                    alt={image.imageName}
                    style={{ width: "200px", height: "50px" }}
                  />
                </td>
                <td>
                  <button
                    className="operation btn btn-danger btn-sm me-2 mb-2"
                    onClick={() => deleteImage(image.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SliderTable;
