import * as St from "assets/BasicStyle";
import Signin from "components/login/Signin";
import Signup from "components/login/Signup";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function Login() {
  const [loginPage, setLoginPage] = useState(true);

  return (
    <St.LoginContainer>
      {loginPage ? (
        <Signin setLoginPage={setLoginPage} />
      ) : (
        <Signup setLoginPage={setLoginPage} />
      )}
      <Outlet />
    </St.LoginContainer>
  );
}

export default Login;
