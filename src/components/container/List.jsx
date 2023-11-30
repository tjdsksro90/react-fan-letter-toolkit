import React from "react";
import {
  ListImg,
  ListImgFigure,
  ListImgWrap,
  ListLi,
  ListTextDesc,
  ListTextTime,
  ListTextTitle,
  ListTextWrap,
  ListUl,
} from "assets/BasicStyle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function List({ tab, lists, search }) {
  const navigate = useNavigate();
  const reduxTab = useSelector((state) => state.tab);

  return (
    <div>
      <ListUl>
        {lists
          .filter((item) => item.writedTo === tab)
          .filter((item) => item.nickname.toLowerCase().includes(search))
          .map((item) => {
            return (
              <ListLi
                key={item.id}
                color={reduxTab}
                onClick={() =>
                  navigate("/detail/" + item.id, {
                    state: lists,
                  })
                }
              >
                <ListImgWrap>
                  <ListImgFigure>
                    <ListImg src={`img/${item.img}`} alt="img" />
                  </ListImgFigure>
                </ListImgWrap>
                <ListTextWrap>
                  <ListTextTitle>{item.nickname}</ListTextTitle>
                  <ListTextTime>{item.createdAt}</ListTextTime>
                  <ListTextDesc>{item.content}</ListTextDesc>
                </ListTextWrap>
              </ListLi>
            );
          })}
      </ListUl>
    </div>
  );
}

export default List;
