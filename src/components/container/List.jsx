import * as St from "assets/BasicStyle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getLists } from "redux/modules/listSlice";

function List({ tab, search }) {
  const navigate = useNavigate();
  const reduxTab = useSelector((state) => state.tab);

  const dispatch = useDispatch();

  const {
    isLoading,
    error,
    lists = [],
  } = useSelector((state) => {
    return state.lists;
  });

  useEffect(() => {
    dispatch(__getLists({ navigate }));
  }, []);

  if (isLoading) {
    return <div style={{ color: "#fff" }}>로딩중...</div>;
  }

  if (error) {
    return <div style={{ color: "#fff" }}>{error.message}</div>;
  }

  return (
    <div>
      <St.ListUl>
        {lists
          .filter((item) => item.writedTo === tab)
          .filter((item) => item.nickname.toLowerCase().includes(search))
          .map((item) => {
            return (
              <St.ListLi
                key={item.id}
                color={reduxTab}
                onClick={() =>
                  navigate("/detail/" + item.id, {
                    state: lists,
                  })
                }
              >
                <St.ListImgWrap>
                  <St.ListImgFigure>
                    {item.img === null ? (
                      <St.ListImg src="img/img-icon-cap.png" alt="img" />
                    ) : (
                      <St.ListImg src={`${item.img}`} alt="img" />
                    )}
                  </St.ListImgFigure>
                </St.ListImgWrap>
                <St.ListTextWrap>
                  <St.ListTextTitle>{item.nickname}</St.ListTextTitle>
                  <St.ListTextTime>{item.createdAt}</St.ListTextTime>
                  <St.ListTextDesc>{item.content}</St.ListTextDesc>
                </St.ListTextWrap>
              </St.ListLi>
            );
          })}
      </St.ListUl>
    </div>
  );
}

export default List;
