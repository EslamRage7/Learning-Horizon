import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditSuggest() {
  document.title = "Edit Videos";
  const { suggestID } = useParams();
  const navigate = useNavigate();

  const [videoName, setVideoName] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [currentVideoPath, setCurrentVideoPath] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const api_url = `https://learning-horizon-server.premiumasp.net/Api/Suggest?id=${suggestID}`;

  const getData = () => {
    fetch(api_url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const video = data[0];
          setVideoName(video.videoName);
          setCurrentVideoPath(video.videoPath);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!videoName) newErrors.videoName = "Title is required";
    if (!videoFile && !currentVideoPath)
      newErrors.videoFile = "Video is required";
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
      customClass: {
        popup: "custom-swal",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        formData.append("videoName", videoName);
        if (videoFile) {
          formData.append("videoFile", videoFile);
        }

        try {
          await axios.put(api_url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            },
          });

          Swal.fire({
            title: "Done",
            text: "Your lesson updated successfully",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              popup: "custom-swal",
            },
          }).then(() => {
            navigate("/admin/suggests");
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: `An error occurred: ${
              error.response ? error.response.data : error.message
            }`,
            icon: "error",
            customClass: {
              popup: "custom-swal",
            },
          });
        } finally {
          setLoading(false);
          setUploadProgress(0);
        }
      } else if (result.isDenied) {
        Swal.fire({
          title: "Info",
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
        navigate("/admin/suggests");
      }
    });
  };

  return (
    <div className="update">
      <h1 className="mb-5 pills-head pills-head-table">Edit Videos</h1>
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
          <div className="row">
            <div className="col-lg-6 col-6">
              <div className="mb-3">
                <label htmlFor="Title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Title"
                  value={
                    videoName.includes(".mp4")
                      ? videoName.replace(".mp4", "")
                      : videoName
                  }
                  onChange={(e) => {
                    setVideoName(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      videoName: "",
                    }));
                  }}
                />
                {errors.videoName && (
                  <div className="text-danger">{errors.videoName}</div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-6">
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Video
                </label>
                <input
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="form-control file ps-3"
                  type="file"
                  id="formFile"
                />
                {errors.videoFile && (
                  <div className="text-danger">{errors.videoFile}</div>
                )}
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

export default EditSuggest;
