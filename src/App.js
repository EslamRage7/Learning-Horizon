import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Preloader from "./Components/Preloader/Preloader";
import Login from "./Components/Registration/Login";
import Signup from "./Components/Registration/Sign-up";
import Informtion from "./Components/Registration/Information";
import Home from "./Components/Pages/Home";
import SignWithGoogle from "./Components/Registration/Test";
import Forgotpass from "./Components/Registration/Forgotpass";
import Newpassword from "./Components/Registration/Newpassword";

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
      <div className="App">
        <Routes>
          {/* <Route path="/preloader" element={<Preloader />}></Route> */}
          <Route path="/" element={loading ? <Preloader /> : <Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/information" element={<Informtion />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/resetPassword" element={<Forgotpass />}></Route>
          <Route path="/newPassword" element={<Newpassword />}></Route>
          <Route path="/test" element={<SignWithGoogle />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
