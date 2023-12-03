import * as St from "assets/BasicStyle";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { __getLogin } from "redux/modules/authSlice";

function SigninPage({ setLoginPage }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });

  const isFormValid = loginForm.id !== "" && loginForm.password !== "";

  const onLoginHandler = async (e) => {
    e.preventDefault();

    if (loginForm.id < 4 || loginForm.id < 4) {
      return toast.error("아이디와 비밀번호가 너무 짧습니다");
    }

    dispatch(
      __getLogin({
        id: loginForm.id,
        password: loginForm.password,
      })
    ).then((res) => {
      console.log(res);
      if (res.error) return;
      navigate("/");
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <St.LoginBasicWrap>
      <St.LoginFormWrap onSubmit={onLoginHandler}>
        <h2>로그인</h2>
        <St.LoginFormSection>
          <span>
            <label htmlFor="id">아이디</label>
          </span>
          <St.LoginFormSpan>
            <St.LoginFormInput
              type="text"
              name="id"
              value={loginForm.id}
              onChange={handleChange}
              placeholder="아이디 (4~10글자)"
              maxLength={10}
            />
          </St.LoginFormSpan>
        </St.LoginFormSection>
        <St.LoginFormSection>
          <span>
            <label htmlFor="password">비밀번호</label>
          </span>
          <St.LoginFormSpan>
            <St.LoginFormInput
              type="text"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              placeholder="비밀번호 (4~15글자)"
              maxLength={15}
            />
          </St.LoginFormSpan>
        </St.LoginFormSection>
        <St.LoginFormButton disabled={!isFormValid}>로그인</St.LoginFormButton>
      </St.LoginFormWrap>
      <button type="button" onClick={() => setLoginPage(false)}>
        회원가입 페이지 이동
      </button>
    </St.LoginBasicWrap>
  );
}

export default SigninPage;
