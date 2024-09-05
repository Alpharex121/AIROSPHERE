import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clubReducer from "./clubSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
  },
});

export default appStore;
