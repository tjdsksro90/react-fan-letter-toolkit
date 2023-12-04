import * as St from "assets/BasicStyle";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getUser } from "redux/modules/authSlice";
import { __addList } from "redux/modules/listSlice";
import character from "../Character";

function Form({ tab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxTab = useSelector((state) => state.tab);

  const [list, setList] = useState({
    nickname: "",
    writedTo: "cap",
  });

  const changeHandler = (e) => {
    setList({
      ...list,
      [e.target.name]: e.target.value,
    });
  };
  // focus
  const contentRef = useRef("");

  // tab 선택시 input 포커스
  useEffect(() => {
    contentRef.current.focus();
    setList({
      ...list,
      writedTo: tab,
    });
  }, [tab]);

  const submitHandler = (e) => {
    e.preventDefault();
    const today = new Date();
    dispatch(
      __addList({
        createdAt: today.toJSON(),
        nickname: list.nickname,
        img: list.img,
        writedTo: list.writedTo,
        content: list.content,
        userId: list.userId,
      })
    );
  };

  // 유저 정보 가져오기
  useEffect(() => {
    dispatch(__getUser({ navigate })).then((res) => {
      setList({
        ...list,
        nickname: res.payload.nickname,
        userId: res.payload.id,
        img: res.payload.avatar,
      });
    });
  }, []);

  return (
    <St.FormWrap onSubmit={submitHandler}>
      <St.FormSection>
        <span>
          <label htmlFor="nickname">nickname</label>
        </span>
        <St.FormSpan>
          <St.FormInput
            name="nickname"
            id="nickname"
            type="text"
            value={list.nickname}
            onChange={changeHandler}
            maxLength={20}
            disabled
            required
          />
        </St.FormSpan>
      </St.FormSection>
      <St.FormSection>
        <span>
          <label htmlFor="content">Content</label>
        </span>
        <St.FormSpan>
          <St.FormTextarea
            name="content"
            id="content"
            ref={contentRef}
            cols="30"
            rows="10"
            placeholder="Your Content ( max : 100 )"
            value={list.content}
            onChange={changeHandler}
            maxLength={100}
            required
          ></St.FormTextarea>
        </St.FormSpan>
      </St.FormSection>
      <St.FormSection>
        <span>
          <label htmlFor="writedTo">Who ?</label>
        </span>
        <St.FormSpan>
          <St.FormSelect
            name="writedTo"
            id="writedTo"
            onChange={changeHandler}
            value={list.writedTo}
          >
            {character.map((item) => {
              return (
                <option key={item.val} value={item.val}>
                  {item.name}
                </option>
              );
            })}
          </St.FormSelect>
        </St.FormSpan>
      </St.FormSection>
      <div>
        <St.FormButton color={reduxTab} type="submit">
          Send
        </St.FormButton>
      </div>
    </St.FormWrap>
  );
}

export default Form;
