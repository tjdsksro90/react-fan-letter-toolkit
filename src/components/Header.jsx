import { removeCookie } from "api/cookies";
import * as St from "assets/BasicStyle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");
    toast.success("로그아웃 되었습니다");
    navigate("/login");
  };

  return (
    <St.HeaderLink>
      <button type="button" onClick={() => navigate("/")}>
        HOME
      </button>
      <button type="button" onClick={logoutHandler}>
        로그아웃
      </button>
      <button type="button" onClick={() => navigate("/mypage")}>
        마이페이지
      </button>
    </St.HeaderLink>
  );
}

export default Header;
