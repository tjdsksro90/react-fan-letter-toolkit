import React from "react";
import { useSelector } from "react-redux";
import Spinner from "assets/img/spinner.gif";
import * as St from "assets/BasicStyle";

function Loading() {
  const { loading } = useSelector((state) => state.loading);
  return (
    <>
      {loading === false ? (
        ""
      ) : (
        <St.SpinnerStyle>
          <p></p>
          <div>
            <h2>잠시만 기다려 주세요</h2>
            <p>
              <img src={Spinner} alt="spinner" />
            </p>
          </div>
        </St.SpinnerStyle>
      )}
    </>
  );
}

export default Loading;
