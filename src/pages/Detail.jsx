import * as St from "assets/BasicStyle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import data from "../fakeData.json";
import {
  __deleteList,
  __editList,
  __getDetailList,
  __getLists,
} from "redux/modules/listSlice";
import { toast } from "react-toastify";
import { __getUser } from "redux/modules/authSlice";
import Header from "components/Header";

function Detail() {
  const dispatch = useDispatch();
  const reduxTab = useSelector((state) => state.tab);
  const navigate = useNavigate();
  const param = useParams();

  // const [detail, setDetail] = useState("");
  // const [userDetail, setUserDetail] = useState("");

  // useEffect(() => {
  //   dispatch(__getDetailList(param.id));
  // }, []);

  useEffect(() => {
    dispatch(__getUser({ navigate }));
    dispatch(__getDetailList(param.id));
  }, []);

  const { detail = "" } = useSelector((state) => {
    return state.lists;
  });
  const userDetail = useSelector((state) => {
    return state.login;
  });

  // useEffect(() => {
  // if (detail.length <= 0 || detail.length > 1) {
  //   alert("올바르지 않은 접근입니다. 메인페이지로 이동합니다.");
  //   navigate("/");
  // }
  // }, [detail]);

  const [editCheck, setEditCheck] = useState(false);
  const [desc, setDesc] = useState("");

  const editClick = () => {
    setEditCheck(true);
    setDesc(detail.content);
  };
  const editCancel = () => {
    setEditCheck(false);
  };

  const changeHandler = (e) => {
    setDesc(e.target.value);
  };

  const editSubmit = () => {
    if (desc === detail.content) return alert("수정된 부분이 없습니다");
    dispatch(__editList({ param, desc }));
    setEditCheck(false);
    dispatch(__getLists());
    navigate("/");
  };

  const deleteClick = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      dispatch(__deleteList(param.id));
      toast.error("삭제완료");
      dispatch(__getLists());
      navigate("/");
    }
  };

  const checkIfIncludes = () => {
    return detail.img && detail.img.includes("img/");
  };

  // const result = detail.img?.property?.contains("img/");

  return (
    <St.DetailBg color={reduxTab}>
      <Header />
      <Link to="/" style={{ textDecoration: "none" }}>
        <St.DetailHome>홈으로</St.DetailHome>
      </Link>
      <St.DetailVh>
        <St.DetailBox>
          <St.DetailImg>
            {detail.img === null ? (
              <St.DetailImg100 src="../img/img-icon-cap.png" alt="img" />
            ) : checkIfIncludes() ? (
              <St.DetailImg100 src={`../${detail.img}`} alt="img" />
            ) : (
              <St.DetailImg100 src={`${detail.img}`} alt={detail.img} />
            )}
          </St.DetailImg>
          <St.DetailH2 color={reduxTab}>{detail.nickname}</St.DetailH2>
          <St.DetailTime>{detail.createdAt}</St.DetailTime>
          <St.DetailTo>
            To. {detail.writedTo === "cap" ? "Captain America" : "Iron Man"}
          </St.DetailTo>
          {editCheck ? (
            <St.DetailContent>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
                placeholder="Your Content ( max : 100 )"
                value={desc}
                onChange={changeHandler}
                maxLength={100}
                required
              ></textarea>
            </St.DetailContent>
          ) : (
            <St.DetailContent>{detail.content}</St.DetailContent>
          )}
          {detail.userId === userDetail.id ? (
            editCheck ? (
              <St.DetailBtnWrap>
                <St.DetailBtn onClick={editCancel} color={reduxTab}>
                  취소
                </St.DetailBtn>
                <St.DetailBtn onClick={editSubmit} color={reduxTab}>
                  수정 완료
                </St.DetailBtn>
              </St.DetailBtnWrap>
            ) : (
              <St.DetailBtnWrap>
                <St.DetailBtn onClick={editClick} color={reduxTab}>
                  수정
                </St.DetailBtn>
                <St.DetailBtn onClick={deleteClick} color={reduxTab}>
                  삭제
                </St.DetailBtn>
              </St.DetailBtnWrap>
            )
          ) : null}
        </St.DetailBox>
      </St.DetailVh>
    </St.DetailBg>
  );
}

export default Detail;
