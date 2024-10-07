// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import Swal from "sweetalert2";

// // function AddSuggest() {
// //   const lessonsApiUrl = `https://learninghorizon.runasp.net/Api/Lesson/GetAllLessons`;

// //   const [isNew, setIsNew] = useState(true);
// //   const [videoFile, setVideoFile] = useState(null);
// //   const [videoName, setVideoName] = useState("");
// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState(0);
// //   const [lessons, setLessons] = useState([]);
// //   const [selectedLessons, setSelectedLessons] = useState([]);

// //   const getData = () => {
// //     fetch(lessonsApiUrl)
// //       .then((res) => res.json())
// //       .then((data) => {
// //         const sortedData = data.sort((a, b) => {
// //           const courseComparison = a.courseTittle.localeCompare(b.courseTittle);
// //           if (courseComparison !== 0) {
// //             return courseComparison;
// //           }
// //           return a.lessonOrderInCourse - b.lessonOrderInCourse;
// //         });
// //         setLessons(sortedData);
// //       });
// //   };

// //   useEffect(() => {
// //     getData();
// //   }, []);

// //   const validate = () => {
// //     const newErrors = {};
// //     if (isNew && !videoFile) {
// //       newErrors.videoFile = "Please upload a video file.";
// //       newErrors.videoName = "Name is requried.";
// //     } else if (!isNew && selectedLessons.length === 0) {
// //       newErrors.selectedLesson = "Please select at least one lesson.";
// //     }
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleNewOrExistingChange = (e) => {
// //     const value = e.target.value === "new";
// //     setIsNew(value);
// //   };

// //   const handleLessonSelect = (e) => {
// //     const lessonId = parseInt(e.target.value);
// //     const selected = lessons.find((lesson) => lesson.lessonId === lessonId);

// //     if (selected) {
// //       setSelectedLessons((prev) => {
// //         const updated = [...prev, selected];
// //         return updated.slice(0, 2);
// //       });
// //     }
// //   };

// //   const Clear = (index) => {
// //     setSelectedLessons((prevLessons) =>
// //       prevLessons.filter((_, i) => i !== index)
// //     );
// //   };

// //   const swalWithBootstrapButtons = Swal.mixin({
// //     customClass: {
// //       confirmButton: "btn btn-success",
// //       cancelButton: "btn btn-danger",
// //       customClass: {
// //         popup: "custom-swal",
// //       },
// //     },
// //     buttonsStyling: false,
// //   });

// //   const Clear_one = () => {
// //     const videoKey = "homeVideo_1";
// //     const videoName = "lessonName_1";
// //     const videoCoures = "courseName_1";

// //     const videoExists = localStorage.getItem(videoKey);

// //     if (videoExists) {
// //       swalWithBootstrapButtons
// //         .fire({
// //           title: "Are you sure?",
// //           text: "You won't be able to revert this!",
// //           icon: "warning",
// //           showCancelButton: true,
// //           confirmButtonText: "Yes, delete it!",
// //           cancelButtonText: "No, cancel!",
// //           reverseButtons: true,
// //           customClass: {
// //             popup: "custom-swal",
// //           },
// //         })
// //         .then((result) => {
// //           if (result.isConfirmed) {
// //             localStorage.removeItem(videoKey);
// //             localStorage.removeItem(videoName);
// //             localStorage.removeItem(videoCoures);
// //             swalWithBootstrapButtons.fire({
// //               title: "Deleted!",
// //               text: "Your video has been deleted.",
// //               icon: "success",
// //               customClass: {
// //                 popup: "custom-swal",
// //               },
// //             });
// //           } else if (result.dismiss === Swal.DismissReason.cancel) {
// //             swalWithBootstrapButtons.fire({
// //               title: "Cancelled",
// //               text: "Your video is safe :)",
// //               icon: "error",
// //               customClass: {
// //                 popup: "custom-swal",
// //               },
// //             });
// //           }
// //         });
// //     } else {
// //       swalWithBootstrapButtons.fire({
// //         title: "Error",
// //         text: "Video one does not exist.",
// //         icon: "error",
// //         customClass: {
// //           popup: "custom-swal",
// //         },
// //       });
// //     }
// //   };

// //   const Clear_two = () => {
// //     const videoKey = "homeVideo_2";
// //     const videoName = "lessonName_2";
// //     const videoCoures = "courseName_2";

// //     const videoExists = localStorage.getItem(videoKey);

// //     if (videoExists) {
// //       swalWithBootstrapButtons
// //         .fire({
// //           title: "Are you sure?",
// //           text: "You won't be able to revert this!",
// //           icon: "warning",
// //           showCancelButton: true,
// //           confirmButtonText: "Yes, delete it!",
// //           cancelButtonText: "No, cancel!",
// //           reverseButtons: true,
// //           customClass: {
// //             popup: "custom-swal",
// //           },
// //         })
// //         .then((result) => {
// //           if (result.isConfirmed) {
// //             localStorage.removeItem(videoKey);
// //             localStorage.removeItem(videoName);
// //             localStorage.removeItem(videoCoures);

// //             swalWithBootstrapButtons.fire({
// //               title: "Deleted!",
// //               text: "Your video has been deleted.",
// //               icon: "success",
// //               customClass: {
// //                 popup: "custom-swal",
// //               },
// //             });
// //           } else if (result.dismiss === Swal.DismissReason.cancel) {
// //             swalWithBootstrapButtons.fire({
// //               title: "Cancelled",
// //               text: "Your video is safe :)",
// //               icon: "error",
// //               customClass: {
// //                 popup: "custom-swal",
// //               },
// //             });
// //           }
// //         });
// //     } else {
// //       swalWithBootstrapButtons.fire({
// //         title: "Error",
// //         text: "Video two does not exist.",
// //         icon: "error",
// //         customClass: {
// //           popup: "custom-swal",
// //         },
// //       });
// //     }
// //   };

// //   const formSubmit = async (e) => {
// //     e.preventDefault();
// //     if (validate()) {
// //       setLoading(true);
// //       const formData = new FormData();

// //       if (isNew) {
// //         formData.append("videoFile", videoFile);
// //         formData.append("videoName", videoName);
// //       } else {
// //         selectedLessons.map((lesson) => lesson.lessonPath);
// //       }

// //       try {
// //         if (isNew) {
// //           const response = await axios.post(
// //             "https://learninghorizon.runasp.net/Api/Suggest",
// //             formData,
// //             {
// //               headers: {
// //                 "Content-Type": "multipart/form-data",
// //               },
// //               onUploadProgress: (progressEvent) => {
// //                 const percentCompleted = Math.round(
// //                   (progressEvent.loaded * 100) / progressEvent.total
// //                 );
// //                 setUploadProgress(percentCompleted);
// //               },
// //             }
// //           );
// //         }

// //         selectedLessons.forEach((lesson, index) => {
// //           localStorage.setItem(`lessonName_${index + 1}`, lesson.lessonTittle);
// //           localStorage.setItem(`courseName_${index + 1}`, lesson.courseTittle);
// //           localStorage.setItem(
// //             `homeVideo_${index + 1}`,
// //             `https://learninghorizon.runasp.net/Api/Lesson/GetLessonFile?path=${lesson.lessonPath}`
// //           );
// //         });

// //         Swal.fire({
// //           title: "Done",
// //           text: "Your video uploaded successfully",
// //           icon: "success",
// //           customClass: {
// //             popup: "custom-swal",
// //           },
// //         });

// //         setVideoFile(null);
// //         setVideoName("");
// //         setSelectedLessons([]);
// //       } catch (error) {
// //         Swal.fire({
// //           title: "Error",
// //           text: ` ${error.response.data}`,
// //           icon: "error",
// //           customClass: {
// //             popup: "custom-swal",
// //           },
// //         });
// //       } finally {
// //         setLoading(false);
// //         setUploadProgress(0);
// //       }
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="admin">
// //         {loading && (
// //           <div className="loading-overlay text-center">
// //             <div className="d-flex flex-column justify-content-center align-items-center">
// //               <div className="spinner"></div>
// //               <div className="progress mt-3" style={{ width: "100%" }}>
// //                 <div
// //                   className="progress-bar"
// //                   role="progressbar"
// //                   style={{ width: `${uploadProgress}%` }}
// //                   aria-valuenow={uploadProgress}
// //                   aria-valuemin="0"
// //                   aria-valuemax="100"
// //                 >
// //                   {uploadProgress}%
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //         <form onSubmit={formSubmit}>
// //           <h1 className="mb-5 pills-head text-center">Suggested videos</h1>
// //           <div className="row">
// //             <div className="col-12">
// //               <div className="mb-3 d-flex align-items-center">
// //                 <input
// //                   type="radio"
// //                   id="new"
// //                   name="newOrExisting"
// //                   value="new"
// //                   checked={isNew === true}
// //                   onChange={handleNewOrExistingChange}
// //                 />
// //                 <label htmlFor="new" className="me-2 ms-1">
// //                   New
// //                 </label>
// //                 <input
// //                   type="radio"
// //                   id="existing"
// //                   name="newOrExisting"
// //                   value="existing"
// //                   className="ms-1"
// //                   checked={isNew === false}
// //                   onChange={handleNewOrExistingChange}
// //                 />
// //                 <label htmlFor="existing" className="ms-1">
// //                   Existing
// //                 </label>
// //                 {errors.newOrExisting && (
// //                   <div className="text-danger">{errors.newOrExisting}</div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //           {isNew ? (
// //             <div className="row">
// //               <div className="col-12">
// //                 <div className="mb-3">
// //                   <label htmlFor="formtext" className="form-label">
// //                     Title
// //                   </label>
// //                   <input
// //                     value={videoName}
// //                     onChange={(e) => setVideoName(e.target.value)}
// //                     className="form-control"
// //                     type="text"
// //                     id="formtext"
// //                   />
// //                   {errors.videoName && (
// //                     <div className="text-danger">{errors.videoName}</div>
// //                   )}
// //                 </div>
// //                 <div className="mb-3">
// //                   <label htmlFor="formFile" className="form-label">
// //                     Upload Video
// //                   </label>
// //                   <input
// //                     accept="video/*"
// //                     onChange={(e) => setVideoFile(e.target.files[0])}
// //                     className="form-control file ps-3"
// //                     type="file"
// //                     id="formFile"
// //                   />
// //                   {errors.videoFile && (
// //                     <div className="text-danger">{errors.videoFile}</div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           ) : (
// //             <div className="mb-3">
// //               <label htmlFor="lessonSelect" className="form-label">
// //                 Choose from existing lessons
// //               </label>
// //               <select
// //                 id="lessonSelect"
// //                 className="form-control"
// //                 onChange={handleLessonSelect}
// //                 multiple
// //               >
// //                 <option value="">Select lessons</option>
// //                 {lessons.map((lesson) => (
// //                   <option key={lesson.lessonId} value={lesson.lessonId}>
// //                     {lesson.courseTittle} - {lesson.lessonTittle}
// //                   </option>
// //                 ))}
// //               </select>
// //               <div className="mt-3">
// //                 {selectedLessons.map((lesson, index) => (
// //                   <div key={index}>
// //                     <h5 className="selectedLessons">
// //                       {index + 1}: {lesson.courseTittle} - {lesson.lessonTittle}
// //                     </h5>
// //                     <button
// //                       type="button"
// //                       onClick={() => Clear(index)}
// //                       className="btn btn-sm btn-secondary  mb-3 me-3"
// //                     >
// //                       Clear
// //                     </button>
// //                   </div>
// //                 ))}
// //                 <button
// //                   type="button"
// //                   onClick={() => Clear_one()}
// //                   className={`btn add mb-3 me-3 ${
// //                     localStorage.getItem("homeVideo_1")
// //                       ? "btn-danger"
// //                       : "btn-primary"
// //                   }`}
// //                 >
// //                   {localStorage.getItem("homeVideo_1")
// //                     ? `Remove ${localStorage.getItem(
// //                         "lessonName_1"
// //                       )}-${localStorage.getItem("courseName_1")}`
// //                     : "Empty"}
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => Clear_two()}
// //                   className={`btn add mb-3 me-3 ${
// //                     localStorage.getItem("homeVideo_2")
// //                       ? "btn-danger"
// //                       : "btn-primary"
// //                   }`}
// //                 >
// //                   {localStorage.getItem("homeVideo_2")
// //                     ? `Remove ${localStorage.getItem(
// //                         "lessonName_2"
// //                       )}-${localStorage.getItem("courseName_2")}`
// //                     : "Empty"}
// //                 </button>
// //               </div>
// //               {errors.selectedLesson && (
// //                 <div className="text-danger">{errors.selectedLesson}</div>
// //               )}
// //             </div>
// //           )}

// //           <button type="submit" className="btn btn-success add mb-3 me-3">
// //             Publish now
// //           </button>
// //         </form>
// //       </div>
// //     </>
// //   );
// // }

// // export default AddSuggest;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// function AddSuggest() {
//   const lessonsApiUrl = `https://learninghorizon.runasp.net/Api/Lesson/GetAllLessons`;

//   const [isNew, setIsNew] = useState(true);
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoName, setVideoName] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [lessons, setLessons] = useState([]);
//   const [selectedLessons, setSelectedLessons] = useState([]);

//   const getData = () => {
//     fetch(lessonsApiUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         const sortedData = data.sort((a, b) => {
//           const courseComparison = a.courseTittle.localeCompare(b.courseTittle);
//           if (courseComparison !== 0) {
//             return courseComparison;
//           }
//           return a.lessonOrderInCourse - b.lessonOrderInCourse;
//         });
//         setLessons(sortedData);
//       });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const validate = () => {
//     const newErrors = {};
//     if (isNew && !videoFile) {
//       newErrors.videoFile = "Please upload a video file.";
//       newErrors.videoName = "Name is requried.";
//     } else if (!isNew && selectedLessons.length === 0) {
//       newErrors.selectedLesson = "Please select at least one lesson.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNewOrExistingChange = (e) => {
//     const value = e.target.value === "new";
//     setIsNew(value);
//   };

//   const handleLessonSelect = (e) => {
//     const lessonId = parseInt(e.target.value);
//     const selected = lessons.find((lesson) => lesson.lessonId === lessonId);

//     if (selected) {
//       setSelectedLessons((prev) => {
//         const updated = [...prev, selected];
//         return updated.slice(0, 2);
//       });
//     }
//   };

//   const Clear = (index) => {
//     setSelectedLessons((prevLessons) =>
//       prevLessons.filter((_, i) => i !== index)
//     );
//   };

//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-success",
//       cancelButton: "btn btn-danger",
//       customClass: {
//         popup: "custom-swal",
//       },
//     },
//     buttonsStyling: false,
//   });

//   const Clear_one = () => {
//     const videoKey = "homeVideo_1";
//     const videoName = "lessonName_1";
//     const videoCoures = "courseName_1";

//     const videoExists = localStorage.getItem(videoKey);

//     if (videoExists) {
//       swalWithBootstrapButtons
//         .fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Yes, delete it!",
//           cancelButtonText: "No, cancel!",
//           reverseButtons: true,
//           customClass: {
//             popup: "custom-swal",
//           },
//         })
//         .then((result) => {
//           if (result.isConfirmed) {
//             localStorage.removeItem(videoKey);
//             localStorage.removeItem(videoName);
//             localStorage.removeItem(videoCoures);
//             swalWithBootstrapButtons.fire({
//               title: "Deleted!",
//               text: "Your video has been deleted.",
//               icon: "success",
//               customClass: {
//                 popup: "custom-swal",
//               },
//             });
//           } else if (result.dismiss === Swal.DismissReason.cancel) {
//             swalWithBootstrapButtons.fire({
//               title: "Cancelled",
//               text: "Your video is safe :)",
//               icon: "error",
//               customClass: {
//                 popup: "custom-swal",
//               },
//             });
//           }
//         });
//     } else {
//       swalWithBootstrapButtons.fire({
//         title: "Error",
//         text: "Video one does not exist.",
//         icon: "error",
//         customClass: {
//           popup: "custom-swal",
//         },
//       });
//     }
//   };

//   const Clear_two = () => {
//     const videoKey = "homeVideo_2";
//     const videoName = "lessonName_2";
//     const videoCoures = "courseName_2";

//     const videoExists = localStorage.getItem(videoKey);

//     if (videoExists) {
//       swalWithBootstrapButtons
//         .fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Yes, delete it!",
//           cancelButtonText: "No, cancel!",
//           reverseButtons: true,
//           customClass: {
//             popup: "custom-swal",
//           },
//         })
//         .then((result) => {
//           if (result.isConfirmed) {
//             localStorage.removeItem(videoKey);
//             localStorage.removeItem(videoName);
//             localStorage.removeItem(videoCoures);

//             swalWithBootstrapButtons.fire({
//               title: "Deleted!",
//               text: "Your video has been deleted.",
//               icon: "success",
//               customClass: {
//                 popup: "custom-swal",
//               },
//             });
//           } else if (result.dismiss === Swal.DismissReason.cancel) {
//             swalWithBootstrapButtons.fire({
//               title: "Cancelled",
//               text: "Your video is safe :)",
//               icon: "error",
//               customClass: {
//                 popup: "custom-swal",
//               },
//             });
//           }
//         });
//     } else {
//       swalWithBootstrapButtons.fire({
//         title: "Error",
//         text: "Video two does not exist.",
//         icon: "error",
//         customClass: {
//           popup: "custom-swal",
//         },
//       });
//     }
//   };

//   const formSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       setLoading(true);
//       const formData = new FormData();

//       if (isNew) {
//         formData.append("videoFile", videoFile);
//         formData.append("videoName", videoName);
//       } else {
//         selectedLessons.map((lesson) => lesson.lessonPath);
//       }

//       try {
//         if (isNew) {
//           const response = await axios.post(
//             "https://learninghorizon.runasp.net/Api/Suggest",
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//               onUploadProgress: (progressEvent) => {
//                 const percentCompleted = Math.round(
//                   (progressEvent.loaded * 100) / progressEvent.total
//                 );
//                 setUploadProgress(percentCompleted);
//               },
//             }
//           );
//         }

//         selectedLessons.forEach((lesson, index) => {
//           localStorage.setItem(`lessonName_${index + 1}`, lesson.lessonTittle);
//           localStorage.setItem(`courseName_${index + 1}`, lesson.courseTittle);
//           localStorage.setItem(
//             `homeVideo_${index + 1}`,
//             `https://learninghorizon.runasp.net/Api/Lesson/GetLessonFile?path=${lesson.lessonPath}`
//           );
//         });

//         Swal.fire({
//           title: "Done",
//           text: "Your video uploaded successfully",
//           icon: "success",
//           customClass: {
//             popup: "custom-swal",
//           },
//         });

//         setVideoFile(null);
//         setVideoName("");
//         setSelectedLessons([]);
//       } catch (error) {
//         Swal.fire({
//           title: "Error",
//           text: ` ${error.response.data}`,
//           icon: "error",
//           customClass: {
//             popup: "custom-swal",
//           },
//         });
//       } finally {
//         setLoading(false);
//         setUploadProgress(0);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="admin">
//         {loading && (
//           <div className="loading-overlay text-center">
//             <div className="d-flex flex-column justify-content-center align-items-center">
//               <div className="spinner"></div>
//               <div className="progress mt-3" style={{ width: "100%" }}>
//                 <div
//                   className="progress-bar"
//                   role="progressbar"
//                   style={{ width: `${uploadProgress}%` }}
//                   aria-valuenow={uploadProgress}
//                   aria-valuemin="0"
//                   aria-valuemax="100"
//                 >
//                   {uploadProgress}%
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <form onSubmit={formSubmit}>
//           <h1 className="mb-5 pills-head text-center">Suggested videos</h1>
//           <div className="row">
//             <div className="col-12">
//               <div className="mb-3 d-flex align-items-center">
//                 <input
//                   type="radio"
//                   id="new"
//                   name="newOrExisting"
//                   value="new"
//                   checked={isNew === true}
//                   onChange={handleNewOrExistingChange}
//                 />
//                 <label htmlFor="new" className="me-2 ms-1">
//                   New
//                 </label>
//                 <input
//                   type="radio"
//                   id="existing"
//                   name="newOrExisting"
//                   value="existing"
//                   className="ms-1"
//                   checked={isNew === false}
//                   onChange={handleNewOrExistingChange}
//                 />
//                 <label htmlFor="existing" className="ms-1">
//                   Existing
//                 </label>
//                 {errors.newOrExisting && (
//                   <div className="text-danger">{errors.newOrExisting}</div>
//                 )}
//               </div>
//             </div>
//           </div>
//           {isNew ? (
//             <div className="row">
//               <div className="col-12">
//                 <div className="mb-3">
//                   <label htmlFor="formtext" className="form-label">
//                     Title
//                   </label>
//                   <input
//                     value={videoName}
//                     onChange={(e) => setVideoName(e.target.value)}
//                     className="form-control"
//                     type="text"
//                     id="formtext"
//                   />
//                   {errors.videoName && (
//                     <div className="text-danger">{errors.videoName}</div>
//                   )}
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="formFile" className="form-label">
//                     Upload Video
//                   </label>
//                   <input
//                     accept="video/*"
//                     onChange={(e) => setVideoFile(e.target.files[0])}
//                     className="form-control file ps-3"
//                     type="file"
//                     id="formFile"
//                   />
//                   {errors.videoFile && (
//                     <div className="text-danger">{errors.videoFile}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="mb-3">
//               <label htmlFor="lessonSelect" className="form-label">
//                 Choose from existing lessons
//               </label>
//               <select
//                 id="lessonSelect"
//                 className="form-control"
//                 onChange={handleLessonSelect}
//                 multiple
//               >
//                 <option value="">Select lessons</option>
//                 {lessons.map((lesson) => (
//                   <option key={lesson.lessonId} value={lesson.lessonId}>
//                     {lesson.courseTittle} - {lesson.lessonTittle}
//                   </option>
//                 ))}
//               </select>
//               <div className="mt-3">
//                 {selectedLessons.map((lesson, index) => (
//                   <div key={index}>
//                     <h5 className="selectedLessons">
//                       {index + 1}: {lesson.courseTittle} - {lesson.lessonTittle}
//                     </h5>
//                     <button
//                       type="button"
//                       onClick={() => Clear(index)}
//                       className="btn btn-sm btn-secondary  mb-3 me-3"
//                     >
//                       Clear
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => Clear_one()}
//                   className={`btn add mb-3 me-3 ${
//                     localStorage.getItem("homeVideo_1")
//                       ? "btn-danger"
//                       : "btn-primary"
//                   }`}
//                 >
//                   {localStorage.getItem("homeVideo_1")
//                     ? `Remove ${localStorage.getItem(
//                         "lessonName_1"
//                       )}-${localStorage.getItem("courseName_1")}`
//                     : "Empty"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => Clear_two()}
//                   className={`btn add mb-3 me-3 ${
//                     localStorage.getItem("homeVideo_2")
//                       ? "btn-danger"
//                       : "btn-primary"
//                   }`}
//                 >
//                   {localStorage.getItem("homeVideo_2")
//                     ? `Remove ${localStorage.getItem(
//                         "lessonName_2"
//                       )}-${localStorage.getItem("courseName_2")}`
//                     : "Empty"}
//                 </button>
//               </div>
//               {errors.selectedLesson && (
//                 <div className="text-danger">{errors.selectedLesson}</div>
//               )}
//             </div>
//           )}

//           <button type="submit" className="btn btn-success add mb-3 me-3">
//             Publish now
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default AddSuggest;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// function AddSuggest() {
//   const lessonsApiUrl = `https://learninghorizon.runasp.net/Api/Lesson/GetAllLessons`;

//   const [isNew, setIsNew] = useState(true);
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoName, setVideoName] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [lessons, setLessons] = useState([]);
//   const [selectedLessons, setSelectedLessons] = useState([]);

//   const getData = () => {
//     fetch(lessonsApiUrl)
//       .then((res) => res.json())
//       .then((data) => {
//         const sortedData = data.sort((a, b) => {
//           const courseComparison = a.courseTittle.localeCompare(b.courseTittle);
//           if (courseComparison !== 0) {
//             return courseComparison;
//           }
//           return a.lessonOrderInCourse - b.lessonOrderInCourse;
//         });
//         setLessons(sortedData);
//       });
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const validate = () => {
//     const newErrors = {};
//     if (isNew && !videoFile) {
//       newErrors.videoFile = "Please upload a video file.";
//       newErrors.videoName = "Name is requried.";
//     } else if (!isNew && selectedLessons.length === 0) {
//       newErrors.selectedLesson = "Please select at least one lesson.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNewOrExistingChange = (e) => {
//     const value = e.target.value === "new";
//     setIsNew(value);
//   };

//   const handleLessonSelect = (e) => {
//     const lessonId = parseInt(e.target.value);
//     const selected = lessons.find((lesson) => lesson.lessonId === lessonId);

//     if (selected) {
//       setSelectedLessons((prev) => {
//         const updated = [...prev, selected];
//         return updated.slice(0, 2);
//       });
//     }
//   };

//   const Clear = (index) => {
//     setSelectedLessons((prevLessons) =>
//       prevLessons.filter((_, i) => i !== index)
//     );
//   };

//   const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//       confirmButton: "btn btn-success",
//       cancelButton: "btn btn-danger",
//       customClass: {
//         popup: "custom-swal",
//       },
//     },
//     buttonsStyling: false,
//   });

//   const Clear_one = () => {
//     const videoKey = "homeVideo_1";
//     const videoName = "lessonName_1";
//     const videoCoures = "courseName_1";

//     const videoExists = localStorage.getItem(videoKey);

//     if (videoExists) {
//       swalWithBootstrapButtons
//         .fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Yes, delete it!",
//           cancelButtonText: "No, cancel!",
//           reverseButtons: true,
//           customClass: {
//             popup: "custom-swal",
//           },
//         })
//         .then((result) => {
//           if (result.isConfirmed) {
//             localStorage.removeItem(videoKey);
//             localStorage.removeItem(videoName);
//             localStorage.removeItem(videoCoures);
//             swalWithBootstrapButtons.fire({
//               title: "Deleted!",
//               text: "Your video has been deleted.",
//               icon: "success",
//               customClass: {
//                 popup: "custom-swal",
//               },
//             });
//           } else if (result.dismiss === Swal.DismissReason.cancel) {
//             swalWithBootstrapButtons.fire({
//               title: "Cancelled",
//               text: "Your video is safe :)",
//               icon: "error",
//               customClass: {
//                 popup: "custom-swal",
//               },
//             });
//           }
//         });
//     } else {
//       swalWithBootstrapButtons.fire({
//         title: "Error",
//         text: "Video one does not exist.",
//         icon: "error",
//         customClass: {
//           popup: "custom-swal",
//         },
//       });
//     }
//   };

//   const Clear_two = () => {
//     const videoKey = "homeVideo_2";
//     const videoName = "lessonName_2";
//     const videoCoures = "courseName_2";

//     const videoExists = localStorage.getItem(videoKey);

//     if (videoExists) {
//       swalWithBootstrapButtons
//         .fire({
//           title: "Are you sure?",
//           text: "You won't be able to revert this!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonText: "Yes, delete it!",
//           cancelButtonText: "No, cancel!",
//           reverseButtons: true,
//           customClass: {
//             popup: "custom-swal",
//           },
//         })
//         .then((result) => {
//           if (result.isConfirmed) {
//             localStorage.removeItem(videoKey);
//             localStorage.removeItem(videoName);
//             localStorage.removeItem(videoCoures);

//             swalWithBootstrapButtons.fire({
//               title: "Deleted!",
//               text: "Your video has been deleted.",
//               icon: "success",
//               customClass: {
//                 popup: "custom-swal",
//               },
//             });
//           } else if (result.dismiss === Swal.DismissReason.cancel) {
//             swalWithBootstrapButtons.fire({
//               title: "Cancelled",
//               text: "Your video is safe :)",
//               icon: "error",
//               customClass: {
//                 popup: "custom-swal",
//               },
//             });
//           }
//         });
//     } else {
//       swalWithBootstrapButtons.fire({
//         title: "Error",
//         text: "Video two does not exist.",
//         icon: "error",
//         customClass: {
//           popup: "custom-swal",
//         },
//       });
//     }
//   };

//   const formSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       setLoading(true);
//       const formData = new FormData();

//       if (isNew) {
//         formData.append("videoFile", videoFile);
//         formData.append("videoName", videoName);
//       } else {
//         selectedLessons.map((lesson) => lesson.lessonPath);
//       }

//       try {
//         if (isNew) {
//           const response = await axios.post(
//             "https://learninghorizon.runasp.net/Api/Suggest",
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//               onUploadProgress: (progressEvent) => {
//                 const percentCompleted = Math.round(
//                   (progressEvent.loaded * 100) / progressEvent.total
//                 );
//                 setUploadProgress(percentCompleted);
//               },
//             }
//           );
//         }

//         selectedLessons.forEach((lesson, index) => {
//           localStorage.setItem(`lessonName_${index + 1}`, lesson.lessonTittle);
//           localStorage.setItem(`courseName_${index + 1}`, lesson.courseTittle);
//           localStorage.setItem(
//             `homeVideo_${index + 1}`,
//             `https://learninghorizon.runasp.net/Api/Lesson/GetLessonFile?path=${lesson.lessonPath}`
//           );
//         });

//         Swal.fire({
//           title: "Done",
//           text: "Your video uploaded successfully",
//           icon: "success",
//           customClass: {
//             popup: "custom-swal",
//           },
//         });

//         setVideoFile(null);
//         setVideoName("");
//         setSelectedLessons([]);
//       } catch (error) {
//         Swal.fire({
//           title: "Error",
//           text: ` ${error.response.data}`,
//           icon: "error",
//           customClass: {
//             popup: "custom-swal",
//           },
//         });
//       } finally {
//         setLoading(false);
//         setUploadProgress(0);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="admin">
//         {loading && (
//           <div className="loading-overlay text-center">
//             <div className="d-flex flex-column justify-content-center align-items-center">
//               <div className="spinner"></div>
//               <div className="progress mt-3" style={{ width: "100%" }}>
//                 <div
//                   className="progress-bar"
//                   role="progressbar"
//                   style={{ width: `${uploadProgress}%` }}
//                   aria-valuenow={uploadProgress}
//                   aria-valuemin="0"
//                   aria-valuemax="100"
//                 >
//                   {uploadProgress}%
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//         <form onSubmit={formSubmit}>
//           <h1 className="mb-5 pills-head text-center">Suggested videos</h1>
//           <div className="row">
//             <div className="col-12">
//               <div className="mb-3 d-flex align-items-center">
//                 <input
//                   type="radio"
//                   id="new"
//                   name="newOrExisting"
//                   value="new"
//                   checked={isNew === true}
//                   onChange={handleNewOrExistingChange}
//                 />
//                 <label htmlFor="new" className="me-2 ms-1">
//                   New
//                 </label>
//                 <input
//                   type="radio"
//                   id="existing"
//                   name="newOrExisting"
//                   value="existing"
//                   className="ms-1"
//                   checked={isNew === false}
//                   onChange={handleNewOrExistingChange}
//                 />
//                 <label htmlFor="existing" className="ms-1">
//                   Existing
//                 </label>
//                 {errors.newOrExisting && (
//                   <div className="text-danger">{errors.newOrExisting}</div>
//                 )}
//               </div>
//             </div>
//           </div>
//           {isNew ? (
//             <div className="row">
//               <div className="col-12">
//                 <div className="mb-3">
//                   <label htmlFor="formtext" className="form-label">
//                     Title
//                   </label>
//                   <input
//                     value={videoName}
//                     onChange={(e) => setVideoName(e.target.value)}
//                     className="form-control"
//                     type="text"
//                     id="formtext"
//                   />
//                   {errors.videoName && (
//                     <div className="text-danger">{errors.videoName}</div>
//                   )}
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="formFile" className="form-label">
//                     Upload Video
//                   </label>
//                   <input
//                     accept="video/*"
//                     onChange={(e) => setVideoFile(e.target.files[0])}
//                     className="form-control file ps-3"
//                     type="file"
//                     id="formFile"
//                   />
//                   {errors.videoFile && (
//                     <div className="text-danger">{errors.videoFile}</div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="mb-3">
//               <label htmlFor="lessonSelect" className="form-label">
//                 Choose from existing lessons
//               </label>
//               <select
//                 id="lessonSelect"
//                 className="form-control"
//                 onChange={handleLessonSelect}
//                 multiple
//               >
//                 <option value="">Select lessons</option>
//                 {lessons.map((lesson) => (
//                   <option key={lesson.lessonId} value={lesson.lessonId}>
//                     {lesson.courseTittle} - {lesson.lessonTittle}
//                   </option>
//                 ))}
//               </select>
//               <div className="mt-3">
//                 {selectedLessons.map((lesson, index) => (
//                   <div key={index}>
//                     <h5 className="selectedLessons">
//                       {index + 1}: {lesson.courseTittle} - {lesson.lessonTittle}
//                     </h5>
//                     <button
//                       type="button"
//                       onClick={() => Clear(index)}
//                       className="btn btn-sm btn-secondary  mb-3 me-3"
//                     >
//                       Clear
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => Clear_one()}
//                   className={`btn add mb-3 me-3 ${
//                     localStorage.getItem("homeVideo_1")
//                       ? "btn-danger"
//                       : "btn-primary"
//                   }`}
//                 >
//                   {localStorage.getItem("homeVideo_1")
//                     ? `Remove ${localStorage.getItem(
//                         "lessonName_1"
//                       )}-${localStorage.getItem("courseName_1")}`
//                     : "Empty"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => Clear_two()}
//                   className={`btn add mb-3 me-3 ${
//                     localStorage.getItem("homeVideo_2")
//                       ? "btn-danger"
//                       : "btn-primary"
//                   }`}
//                 >
//                   {localStorage.getItem("homeVideo_2")
//                     ? `Remove ${localStorage.getItem(
//                         "lessonName_2"
//                       )}-${localStorage.getItem("courseName_2")}`
//                     : "Empty"}
//                 </button>
//               </div>
//               {errors.selectedLesson && (
//                 <div className="text-danger">{errors.selectedLesson}</div>
//               )}
//             </div>
//           )}

//           <button type="submit" className="btn btn-success add mb-3 me-3">
//             Publish now
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default AddSuggest;

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddSuggest() {
  const lessonsApiUrl = `https://learning-horizon-server.premiumasp.net/Api/Lesson/GetAllLessons`;

  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getData = () => {
    fetch(lessonsApiUrl)
      .then((res) => res.json())
      .then((data) => {});
  };

  useEffect(() => {
    getData();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!videoFile) {
      newErrors.videoFile = "Please upload a video file.";
    }
    if (!videoName) {
      newErrors.videoName = "Name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("videoName", videoName);

      try {
        const response = await axios.post(
          "https://learning-horizon-server.premiumasp.net/Api/Suggest",
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
          text: "Your video uploaded successfully",
          icon: "success",
          customClass: {
            popup: "custom-swal",
          },
        });

        setVideoFile(null);
        setVideoName("");
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: ` ${error.response.data}`,
          icon: "error",
          customClass: {
            popup: "custom-swal",
          },
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
            Suggested videos
          </h1>
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <label htmlFor="formtext" className="form-label">
                  Title
                </label>
                <input
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                  className="form-control"
                  type="text"
                  id="formtext"
                />
                {errors.videoName && (
                  <div className="text-danger">{errors.videoName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Upload Video
                </label>
                <input
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                  className="form-control file ps-3"
                  type="file"
                  id="formFile"
                />
                {errors.videoFile && (
                  <div className="text-danger">{errors.videoFile}</div>
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

export default AddSuggest;
