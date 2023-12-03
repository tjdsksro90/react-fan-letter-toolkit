import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "api/cookies";

const PrivateRoute = () => {
  const isLogined = getCookie("accessToken");
  return isLogined ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
