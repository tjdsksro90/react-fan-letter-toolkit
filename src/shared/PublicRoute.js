import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "api/cookies";

const PublicRoute = () => {
  const isLogined = getCookie("accessToken");
  return isLogined ? <Navigate to="/login" /> : <Outlet />;
};

export default PublicRoute;
