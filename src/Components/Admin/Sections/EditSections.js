import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditCourses() {
  document.title = "Edit Course";

  let { sectionsID } = useParams();
  const navigate = useNavigate();

  const [tittle, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const api_url_get = `https://learning-horizon-server.premiumasp.net/Api/Section`;
  const api_url_put = `https://learning-horizon-server.premiumasp.net/Api/Section?id=${sectionsID}`;

  useEffect(() => {
    axios
      .get(api_url_get)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const section = response.data.find(
            (item) => item.sectionId === parseInt(sectionsID)
          );
          if (section) {
            setTitle(section.sectionTittle || "");
          } else {
          }
        }
      })
      .catch((error) => {});
  }, [api_url_get, sectionsID]);

  const validateForm = () => {
    const newErrors = {};
    if (!tittle) newErrors.tittle = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill out all required fields",
        customClass: {
          popup: "custom-swal",
        },
      });
      return;
    }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      customClass: {
        popup: "custom-swal",
      },
    }).then((data) => {
      if (data.isConfirmed) {
        setLoading(true);
        axios
          .put(
            api_url_put,
            { sectionId: parseInt(sectionsID), tittle: tittle },
            {
              headers: {
                "Content-Type": "application/json",
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
              },
            }
          )
          .then(() => {
            Swal.fire({
              text: "Your section updated successfully!",
              icon: "success",
              customClass: {
                popup: "custom-swal",
              },
            }).then(() => {
              navigate("/admin/books");
            });
          })
          .catch((error) => {})
          .finally(() => {
            setLoading(false);
            setUploadProgress(0);
          });
      } else if (data.isDenied) {
        Swal.fire({
          title: "info",
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
        navigate("/admin/books");
      }
    });
  };

  return (
    <div className="update">
      <h1 className="mb-5 pills-head pills-head-table">Edit Section</h1>
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
        <form onSubmit={formSubmit} className="p-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Section Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Title"
                    value={tittle}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        tittle: "",
                      }));
                    }}
                  />
                  {errors.tittle && (
                    <div className="text-danger">{errors.tittle}</div>
                  )}
                </div>
              </div>
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

export default EditCourses;
