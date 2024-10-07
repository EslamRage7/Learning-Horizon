import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ adminRoute = false }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (adminRoute && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
