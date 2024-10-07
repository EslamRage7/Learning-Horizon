import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddBooks() {
  const [Tittle, setTittle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [BookLink, setBookLink] = useState("");
  const [IsFree, setIsFree] = useState(true);
  const [SectionTittle, setSectionTittle] = useState("");
  const [ImageFile, setImageFile] = useState(null);
  const [BookFile, setBookFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetch("https://learning-horizon-server.premiumasp.net/Api/Section")
      .then((res) => res.json())
      .then((data) => setSections(data));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!Tittle) newErrors.Tittle = "Title is required";
    if (!Description) newErrors.Description = "Description is required";
    if (!SectionTittle) newErrors.SectionTittle = "Section is required";
    if (IsFree === null) newErrors.IsFree = "Free or Premium is required";
    if (BookFile === null) newErrors.BookFile = "BookFile is required";

    if (!ImageFile) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      const formData = new FormData();
      formData.append("Tittle", Tittle);
      formData.append("Description", Description);
      formData.append("Price", IsFree ? 0 : Price);
      formData.append("IsFree", IsFree);
      formData.append("BookLink", BookLink);
      formData.append("SectionTittle", SectionTittle);

      if (ImageFile) {
        formData.append("ImageFile", ImageFile);
      }

      if (BookFile) {
        formData.append("BookFile", BookFile);
      }

      try {
        const response = await axios.post(
          "https://learning-horizon-server.premiumasp.net/Api/Book",
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
          title: "Done",
          text: "Your book uploaded successfully",
          icon: "success",
          customClass: {
            popup: "custom-swal",
          },
        });
        setTittle("");
        setDescription("");
        setPrice("");
        setBookLink("");
        setIsFree(true);
        setSectionTittle("");
        setImageFile(null);
        setBookFile(null);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "An error occurred while uploading the book.",
          icon: "error",
        });
      } finally {
        setLoading(false);
        setUploadProgress(0);
      }
    }
  };

  const handleFreeOrPremiumChange = (e) => {
    const value = e.target.value === "true";
    setIsFree(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      IsFree: "",
    }));
    if (value === true) {
      setPrice("");
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
          <h1 className="mb-lg-5 mb-4 pills-head text-center">Details Books</h1>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="mb-3">
                <label htmlFor="Title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Title"
                  value={Tittle}
                  onChange={(e) => {
                    setTittle(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      Tittle: "",
                    }));
                  }}
                />
                {errors.Tittle && (
                  <div className="text-danger">{errors.Tittle}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="SectionTittle" className="form-label">
                  Section
                </label>
                <select
                  className="form-control"
                  id="SectionTittle"
                  value={SectionTittle}
                  onChange={(e) => {
                    setSectionTittle(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      SectionTittle: "",
                    }));
                  }}
                >
                  <option value="">Select a Section</option>
                  {sections.map((section) => (
                    <option
                      key={section.sectionTittle}
                      value={section.sectionTittle}
                    >
                      {section.sectionTittle}
                    </option>
                  ))}
                </select>
                {errors.SectionTittle && (
                  <div className="text-danger">{errors.SectionTittle}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label ">
                  Image
                </label>
                <input
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="form-control file ps-3"
                  type="file"
                  id="formFile"
                />
                {errors.image && (
                  <div className="text-danger">{errors.image}</div>
                )}
              </div>
              <div className="mb-3 d-flex align-items-center">
                <div className="me-4 d-flex align-items-center">
                  <input
                    type="radio"
                    id="free"
                    name="IsFree"
                    value="true"
                    checked={IsFree === true}
                    onChange={handleFreeOrPremiumChange}
                  />
                  <label htmlFor="free" className="ms-2">
                    Free
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="premium"
                    name="IsFree"
                    value="false"
                    checked={IsFree === false}
                    onChange={handleFreeOrPremiumChange}
                  />
                  <label htmlFor="premium" className="ms-2">
                    Premium
                  </label>
                </div>
                {errors.IsFree && (
                  <div className="text-danger">{errors.IsFree}</div>
                )}
              </div>
              {!IsFree && (
                <div className="mb-3">
                  <label htmlFor="Price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    id="Price"
                    value={Price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Description"
                  value={Description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      Description: "",
                    }));
                  }}
                />
                {errors.Description && (
                  <div className="text-danger">{errors.Description}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="BookLink" className="form-label">
                  Link
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="BookLink"
                  name="BookLink"
                  value={BookLink}
                  onChange={(e) => {
                    setBookLink(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formFilePdf" className="form-label ">
                  Pdf
                </label>
                <input
                  accept=".pdf"
                  name="BookFile"
                  onChange={(e) => setBookFile(e.target.files[0])}
                  className="form-control file ps-3"
                  type="file"
                  id="formFilePdf"
                />
                {errors.BookFile && (
                  <div className="text-danger">{errors.BookFile}</div>
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

export default AddBooks;
