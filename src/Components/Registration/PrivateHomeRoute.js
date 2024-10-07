import { Navigate, Outlet } from "react-router-dom";

function PrivateHomeRoute() {
  const isAuthenticated =
    localStorage.getItem("isConnected") === "true" ||
    sessionStorage.getItem("isConnected") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateHomeRoute;
