import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddSections() {
  const [tittle, setTittle] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!tittle) newErrors.tittle = "Title is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      const formData = new FormData();
      formData.append("Tittle", tittle);
      try {
        const response = await axios.post(
          "https://learning-horizon-server.premiumasp.net/Api/Section",
          formData,
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
        );

        Swal.fire({
          title: "Done",
          text: "Your section uploaded successfully",
          icon: "success",
          customClass: {
            popup: "custom-swal",
          },
        });

        setTittle("");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "This Section is Added Before",
          icon: "error",
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
            Details Sections
          </h1>
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="tittle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tittle"
                  value={tittle}
                  onChange={(e) => {
                    setTittle(e.target.value);
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
            <button type="submit" className="btn btn-success add m-auto ">
              Publish now
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddSections;
