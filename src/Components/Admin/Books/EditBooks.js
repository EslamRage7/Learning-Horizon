import "../css/update.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function EditBooks() {
  document.title = "Dash Board";
  const navigate = useNavigate();
  let { booksID } = useParams();

  const [, setBook] = useState({});
  const [Tittle, setTittle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [BookLink, setBookLink] = useState("");
  const [IsFree, setIsFree] = useState(true);
  const [SectionTittle, setSectionTittle] = useState("");
  const [sections, setSections] = useState([]);
  const [ImageFile, setImageFile] = useState(null);
  const [BookFile, setBookFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [pdfPreview, setPdfPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [, setErrors] = useState({});

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePdfChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBookFile(e.target.files[0]);
      setPdfPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const api_url = `https://learning-horizon-server.premiumasp.net/Api/Book/GetById?id=${booksID}`;

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setTittle(data.bookTitle);
        setDescription(data.bookDescription);
        setPrice(data.bookPrice);
        setSectionTittle(data.sectionTittle);
        setBookLink(data.bookLink);
        setIsFree(data.isFree);
        setImagePreview(data.bookImageLink);
        setPdfPreview(data.bookPath);
      });
  }, [api_url, booksID]);

  useEffect(() => {
    fetch("https://learning-horizon-server.premiumasp.net/Api/Section")
      .then((res) => res.json())
      .then((data) => setSections(data));
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (IsFree === false && (!Price || Price === "0")) {
      newErrors.bookPrice = "Please enter a price for the premium book.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a price for the premium book.",
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
        const formData = new FormData();
        formData.append("Id", booksID);
        formData.append("Tittle", Tittle);
        formData.append("Description", Description);
        formData.append("Price", Price);
        formData.append("IsFree", IsFree);
        formData.append("SectionTittle", SectionTittle);
        if (ImageFile) formData.append("ImageFile", ImageFile);
        if (BookFile) formData.append("BookFile", BookFile);
        formData.append("BookLink", BookLink);

        axios
          .put(
            `https://learning-horizon-server.premiumasp.net/Api/Book`,
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
          )
          .then(() => {
            Swal.fire({
              text: "Your book updated successfully!",
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

  const handleFreeOrPremiumChange = (e) => {
    const value = e.target.value;
    setIsFree(value === "true");
    if (value === "true") {
      setPrice("0");
    } else {
      setPrice(Price);
    }
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
      <h1 className="mb-5 pills-head pills-head-table">Edit Books</h1>
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
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="mb-3">
                  <label htmlFor="Title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={Tittle}
                    className="form-control"
                    id="Title"
                    onChange={(e) => setTittle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Section" className="form-label">
                    Section
                  </label>
                  <select
                    className="form-control"
                    id="Section"
                    value={SectionTittle}
                    onChange={(e) => setSectionTittle(e.target.value)}
                  >
                    <option value="">Select a Section</option>
                    {sections.map((section) => (
                      <option
                        key={section.sectionId}
                        value={section.sectionTittle}
                      >
                        {section.sectionTittle}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label ">
                    Image
                  </label>
                  <input
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control file ps-3"
                    type="file"
                    id="formFile"
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-thumbnail Preview"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <div className="me-4 d-flex align-items-center">
                    <input
                      type="radio"
                      id="free"
                      name="freeOrPremium"
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
                      name="freeOrPremium"
                      value="false"
                      checked={IsFree === false}
                      onChange={handleFreeOrPremiumChange}
                    />
                    <label htmlFor="premium" className="ms-2">
                      Premium
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="Price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    id="Price"
                    value={Price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={Description}
                    className="form-control"
                    id="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Link" className="form-label">
                    Link
                  </label>
                  <input
                    type="text"
                    value={BookLink}
                    className="form-control"
                    id="Link"
                    onChange={(e) => setBookLink(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="formFilePdf" className="form-label ">
                    Pdf
                  </label>
                  <input
                    accept=".pdf"
                    onChange={handlePdfChange}
                    className="form-control file ps-3"
                    type="file"
                    id="formFilePdf"
                  />
                  {pdfPreview && (
                    <div className="mt-3">
                      <iframe
                        src={pdfPreview}
                        title="PDF preview"
                        className="img-thumbnail"
                      />
                    </div>
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

export default EditBooks;
