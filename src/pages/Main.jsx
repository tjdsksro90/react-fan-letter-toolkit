import Container from "components/Container";
import MainTop from "components/MainTop";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { __getLogin } from "redux/modules/authSlice";
import { __tabPatch } from "redux/modules/tabSlice";

function Main() {
  const dispatch = useDispatch();
  // tab 메뉴 관련
  const [tab, setTab] = useState("cap");
  useEffect(() => {
    dispatch(__tabPatch("cap"));
    setTab("cap");
  }, []);

  const tabHandler = (item) => {
    dispatch(__tabPatch(item));
    setTab(item);
  };

  return (
    <div>
      <Outlet />
      <MainTop tab={tab} tabHandler={tabHandler} />
      <Container tab={tab} />
    </div>
  );
}

export default Main;
