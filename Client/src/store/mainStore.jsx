import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clubReducer from "./clubSlice";
import academicReducer from "./academicSlice";
import studentConnectReducer from "./studentConnectSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
    academic: academicReducer,
    academic: academicReducer,
    studentconnect: studentConnectReducer,
  },
});

export default appStore;
