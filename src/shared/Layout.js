import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default Layout;
