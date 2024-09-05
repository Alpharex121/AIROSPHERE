import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clubReducer from "./clubSlice";
import academicReducer from "./academicSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
    academic: academicReducer,
  },
});

export default appStore;
