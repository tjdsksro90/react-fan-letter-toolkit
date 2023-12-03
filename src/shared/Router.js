import GlobalStyle from "assets/GlobalStyle";
import Detail from "pages/Detail";
import Login from "pages/Login";
import Main from "pages/Main";
import Mypage from "pages/Mypage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "shared/Layout";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NoMatch from "pages/NoMatch";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Main />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
