import React from "react";
import { useSelector } from "react-redux";

function Loading() {
  // const { loading } = useSelector((state) => state.loading);
  return (
    <>
      {/* {loading === false ? (
        ""
      ) : (
        <> */}
      <div>로딩중</div>
      {/* </>
      )} */}
    </>
  );
}

export default Loading;
