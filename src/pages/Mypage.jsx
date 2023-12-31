import { removeCookie } from "api/cookies";
import * as St from "assets/BasicStyle";
import Header from "components/Header";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { __editUser, __getUser } from "redux/modules/authSlice";
import { __editUserList } from "redux/modules/listSlice";

function Mypage() {
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.login;
  });
  const [editUser, setEditUser] = useState({
    nickname: "",
    avatar: null,
  });
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const [editCheck, setEditCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getUser({ navigate }));
  }, []);

  const isEditValid =
    editUser.nickname === user.nickname && editUser.avatar === null;

  // 이미지 파일 선택하기
  const saveImgFile = (event) => {
    console.log(event.target.files[0]);
    const file = imgRef.current.files[0];
    if (imgRef.current.files[0] !== undefined) {
      if (imgRef.current.files[0].size > 1024 * 1024)
        return toast.error("이미지가 큽니다. 1MB가 넘지 않도록 해주세요");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result);
        setEditUser({
          ...editUser,
          avatar: imgRef.current.files[0],
        });
      };
    }
  };

  const editClick = () => {
    setEditCheck(true);
    setEditUser({
      ...editUser,
      nickname: user.nickname,
    });
    setImgFile(user.avatar);
  };
  const editCancel = () => {
    setEditCheck(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editSubmit = () => {
    if (editUser.nickname === user.nickname && editUser.avatar === null)
      return alert("수정된 부분이 없습니다");
    if (window.confirm("이대로 수정하시겠습니까?")) {
      dispatch(__editUser(editUser)).then((res) => {
        const userId = user.id;
        const userImg = res.payload.avatar || user.avatar;
        const userName = res.payload.nickname || user.nickname;
        // 리스트 정보들도 수정
        dispatch(__editUserList({ userId, userImg, userName }));
        setEditCheck(false);
      });
    }
  };

  return (
    <St.MypageContainer>
      <Header />
      {/* <button onClick={removeCookie("accessToken")}>쿠키 지우기</button> */}
      <St.MypageBasicWrap>
        <St.MypageDivWrap>
          <h2>프로필 관리</h2>

          {editCheck ? (
            <>
              <St.MypageDivSection>
                <St.MypageImg>
                  {user.avatar === null ? (
                    <St.MypageImg100
                      src={imgFile ? imgFile : `../img/img-icon-cap.png`}
                      alt="img"
                    />
                  ) : (
                    <St.MypageImg100
                      src={imgFile ? imgFile : user.avatar}
                      alt="img"
                    />
                  )}
                </St.MypageImg>
                <St.MypageFormLabel htmlFor="profileImg"></St.MypageFormLabel>
                <St.MypageFormFile
                  type="file"
                  accept="image/*"
                  id="profileImg"
                  onChange={saveImgFile}
                  ref={imgRef}
                />
                <St.MypageDivSpan>
                  <St.MypageFormInput
                    type="text"
                    name="nickname"
                    value={editUser.nickname}
                    onChange={changeHandler}
                    placeholder="최대 10글자 가능"
                    maxLength={10}
                  />
                </St.MypageDivSpan>
                <St.MypageUserId>{user.id}</St.MypageUserId>
              </St.MypageDivSection>
              <St.MypageBtnWrap>
                <St.MypageBtn onClick={editCancel}>취소</St.MypageBtn>
                <St.MypageBtn onClick={editSubmit} disabled={isEditValid}>
                  수정완료
                </St.MypageBtn>
              </St.MypageBtnWrap>
            </>
          ) : (
            <>
              <St.MypageDivSection>
                <St.MypageImg>
                  {user.avatar === null ? (
                    <St.MypageImg100 src="../img/img-icon-cap.png" alt="img" />
                  ) : (
                    <span>
                      <St.MypageImg100 src={user.avatar} alt="img" />
                    </span>
                  )}
                </St.MypageImg>
                <St.MypageUserName>{user.nickname}</St.MypageUserName>
                <St.MypageUserId>{user.id}</St.MypageUserId>
              </St.MypageDivSection>
              <St.MypageBtnWrap>
                <St.MypageBtn onClick={editClick}>수정하기</St.MypageBtn>
              </St.MypageBtnWrap>
            </>
          )}
        </St.MypageDivWrap>
      </St.MypageBasicWrap>
    </St.MypageContainer>
  );
}

export default Mypage;
