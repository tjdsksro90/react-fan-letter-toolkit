import * as St from "assets/BasicStyle";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import character from "./Character";
import Header from "./Header";

function MainTop({ tab, tabHandler }) {
  const reduxTab = useSelector((state) => state.tab);

  return (
    <St.HeaderBg color={reduxTab}>
      <Header />
      <Outlet />
      <St.HeaderH1>Marvel Fan Letter</St.HeaderH1>
      <St.HeaderUl>
        {character.map((item) => {
          return (
            <St.HeaderLi
              className={`${item.val === tab ? "active" : ""} ${item.val}`}
              key={item.val}
              value={item.val}
              onClick={() => tabHandler(item.val)}
              color={reduxTab}
            >
              {item.name}
            </St.HeaderLi>
          );
        })}
      </St.HeaderUl>
    </St.HeaderBg>
  );
}

export default MainTop;
