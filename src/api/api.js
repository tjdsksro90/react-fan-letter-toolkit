import axios from "axios";
import { getCookie, removeCookie, setCookie } from "./cookies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const instance = axios.create({
  baseURL: process.env.REACT_APP_UER_SERVER_URL,
  // timeout: 1,
});

instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    console.log("인터넵터 요청 성공!");
    // 유저 토큰 저장해두기
    const accessToken = getCookie("accessToken");
    // config.headers.Access_token = `Bearer ${accessToken}`;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },

  // 오류 요청을 보내기 전 수행되는 함수
  function (err) {
    console.log("인터넵터 요청 오류!");
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (config) {
    console.log("인터넵터 응답 성공!");
    return config;
  },

  // 오류 응답을 내보내기 전 수행되는 함수
  async function (err) {
    console.log(err, "인터넵터 응답 오류!");
    // 리프레쉬 토큰
    if ((err.name = "AxiosError")) {
      switch (err.response.status) {
        case 401:
          removeCookie("accessToken");
          toast.error(err.response.data.message);
          return axios(err.config);
        default:
          toast.error(err.response.data.message);
          break;
      }
      toast.error(err.name);
      removeCookie("accessToken");
    }
    return Promise.reject(err);
  }
);

export default instance;
