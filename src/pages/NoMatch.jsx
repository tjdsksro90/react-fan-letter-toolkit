import React from "react";
import { Link } from "react-router-dom";
import * as St from "assets/BasicStyle";

function NoMatch() {
  return (
    <St.NomatchWrap>
      <St.NomatchWrapH2>잘못된 경로로 접근하였습니다</St.NomatchWrapH2>
      <St.NomatchWrapLink>
        <Link to="/">Home으로 이동하기</Link>
      </St.NomatchWrapLink>
    </St.NomatchWrap>
  );
}

export default NoMatch;
