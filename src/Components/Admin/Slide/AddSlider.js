import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddSlider() {
  const [imageName, setImageName] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!imageName) {
      newErrors.imageName = "Name is required.";
    }
    if (!imageFile) {
      newErrors.imageFile = "Please upload an image file.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", imageName);
      formData.append("link", link);
      formData.append("imageFile", imageFile);

      try {
        const response = await axios.post(
          "https://learning-horizon-server.premiumasp.net/Api/Slider",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
          title: "Success!",
          text: "Your image has been uploaded.",
          icon: "success",
          confirmButtonText: "Ok",
          customClass: {
            popup: "custom-swal",
          },
        });

        setImageName("");
        setLink("");
        setImageFile(null);
      } catch (error) {
        const errorMessage =
          error.response && error.response.data
            ? error.response.data
            : "An error occurred while uploading the image.";

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          customClass: {
            popup: "custom-swal",
          },
          confirmButtonText: "Ok",
        });
      } finally {
        setLoading(false);
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
            Suggested Banner
          </h1>

          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="formtext" className="form-label">
                  Title
                </label>
                <input
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  className="form-control"
                  type="text"
                  id="formtext"
                />
                {errors.imageName && (
                  <div className="text-danger">{errors.imageName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="link" className="form-label">
                  Link
                </label>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="form-control"
                  type="text"
                  id="link"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload Image
                </label>
                <input
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="form-control file ps-3"
                  type="file"
                  id="formFile"
                />
                {errors.imageFile && (
                  <div className="text-danger">{errors.imageFile}</div>
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

export default AddSlider;
