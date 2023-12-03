import * as St from "assets/BasicStyle";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { __getSignup } from "redux/modules/authSlice";

function Signup({ setLoginPage }) {
  const dispatch = useDispatch();

  const notifySignUp = {
    signUpSuccess: () => toast.success("회원가입완료", { autoClose: 2000 }),
    signUpFailed: () => toast.error("거 똑바로 치쇼", { autoClose: 2000 }),
  };

  const [signupForm, setSignupForm] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const isFormSignUpValid =
    signupForm.id !== "" &&
    signupForm.password !== "" &&
    signupForm.nickname !== "";

  const onSignupHandler = (e) => {
    e.preventDefault();

    dispatch(
      __getSignup({
        id: signupForm.id,
        password: signupForm.password,
        nickname: signupForm.nickname,
      })
    ).then((res) => {
      if (res.error) return;
      toast.success("회원가입 성공!");
      setLoginPage(true);
    });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <St.LoginBasicWrap>
      <St.LoginFormWrap onSubmit={onSignupHandler}>
        <h2>회원가입</h2>
        <St.LoginFormSection>
          <span>
            <label htmlFor="id">아이디</label>
          </span>
          <St.LoginFormSpan>
            <St.LoginFormInput
              type="text"
              placeholder="아이디 (4~10글자)"
              name="id"
              value={signupForm.id}
              onChange={handleSignupChange}
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
              placeholder="비밀번호 (4~15글자)"
              name="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              maxLength={15}
            />
          </St.LoginFormSpan>
        </St.LoginFormSection>
        <St.LoginFormSection>
          <span>
            <label htmlFor="password">닉네임</label>
          </span>
          <St.LoginFormSpan>
            <St.LoginFormInput
              type="text"
              placeholder="닉네임 (1~10글자)"
              name="nickname"
              value={signupForm.nickname}
              onChange={handleSignupChange}
              maxLength={10}
            />
          </St.LoginFormSpan>
        </St.LoginFormSection>
        <St.LoginFormButton disabled={!isFormSignUpValid}>
          회원가입
        </St.LoginFormButton>
      </St.LoginFormWrap>
      <button type="button" onClick={() => setLoginPage(true)}>
        로그인 페이지 이동
      </button>
    </St.LoginBasicWrap>
  );
}

export default Signup;
