import { configureStore } from "@reduxjs/toolkit";
import tab from "redux/modules/tabSlice";
import lists from "redux/modules/listSlice";
import login from "redux/modules/authSlice";
import loading from "redux/modules/loading";

const store = configureStore({
  reducer: {
    tab,
    lists,
    login,
    loading,
  },
});

export default store;
