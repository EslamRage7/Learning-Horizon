import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Preloader from "./Components/Preloader/Preloader";
import Login from "./Components/Registration/Login";
import SignUp from "./Components/Registration/SignUp";
import EmailVerification from "./Components/Registration/EmailVerification";
import Informtion from "./Components/Registration/Information";
import ForgotPassword from "./Components/Registration/ForgotPassword";
import ConfirmCode from "./Components/Registration/ConfirmCode";
import NewPassword from "./Components/Registration/NewPassword";
import Admin from "./Components/Admin/Admin";
import EditBooks from "./Components/Admin/Books/EditBooks";
import BooksDetails from "./Components/Admin/Books/BooksDetails";
import EditSections from "./Components/Admin/Sections/EditSections";
import EditCourses from "./Components/Admin/Courses/EditCourses";
import CoursesDetails from "./Components/Admin/Courses/CoursesDetails";
import VideosDetails from "./Components/Admin/Videos/VideosDetails";
import EditVideos from "./Components/Admin/Videos/EditVideos";
import CoursesVideoes from "./Components/Pages/CoursesVideoes";
import Home from "./Components/Pages/Home";
import PrivateRoute from "./Components/Registration/PrivateRoute";
import PrivateHomeRoute from "./Components/Registration/PrivateHomeRoute";
import EditSuggest from "./Components/Admin/Suggest/EditSuggest";
import Material from "./Components/Pages/Material";
import Books from "./Components/Pages/Books";
import Settings from "./Components/Pages/Settings";
import Session from "./Components/Pages/Session";
import Add from "./Components/Admin/Pages/Add";
import Suggests from "./Components/Admin/Pages/Suggests";
import AdminBooks from "./Components/Admin/Pages/AdminBooks";
import Lessons from "./Components/Admin/Pages/Lesssons";
import Team from "./Components/Pages/Team";
import PaymobPayment from "./Components/Pages/Payment";
import Test from "./Components/Pages/Test";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="icon" href="./16x16.ico" sizes="16x16" />
      </Helmet>
      <div className="App">
        <Routes>
          {/* Start Registration */}
          <Route path="/" element={loading ? <Preloader /> : <Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/emailVerification" element={<EmailVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/information" element={<Informtion />} />
          <Route path="/resetPassword" element={<ForgotPassword />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/confirmCode" element={<ConfirmCode />} />
          {/* End Registration */}

          {/* Start Pages */}
          <Route element={<PrivateHomeRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/material" element={<Material />} />
            <Route path="/books" element={<Books />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/sessions" element={<Session />} />
            <Route
              path="/home/course-videos/:courseID"
              element={<CoursesVideoes />}
            />
            {/* <Route path="/Codex-Team" element={<Team />} /> */}
          </Route>
          <Route path="/payment" element={<PaymobPayment />} />

          <Route path="/test" element={<Test />} />

          {/* End Pages */}

          {/* Start Admin */}
          <Route element={<PrivateRoute adminRoute={true} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add" element={<Add />} />
            <Route path="/admin/suggests" element={<Suggests />} />
            <Route path="/admin/books" element={<AdminBooks />} />
            <Route path="/admin/lessons" element={<Lessons />} />

            <Route path="/admin/books/edit/:booksID" element={<EditBooks />} />
            <Route
              path="/admin/sections/edit/:sectionsID"
              element={<EditSections />}
            />
            <Route
              path="/admin/courses/edit/:courseID"
              element={<EditCourses />}
            />
            <Route
              path="/admin/lessons/edit/:lessonsID"
              element={<EditVideos />}
            />
            <Route
              path="/admin/suggest/edit/:suggestID"
              element={<EditSuggest />}
            />

            <Route path="/admin/books/:booksID" element={<BooksDetails />} />
            <Route
              path="/admin/courses/:courseID"
              element={<CoursesDetails />}
            />
            <Route
              path="/admin/lessons/:lessonsID"
              element={<VideosDetails />}
            />
          </Route>
          {/* End Admin */}
        </Routes>
      </div>
    </>
  );
}

export default App;
