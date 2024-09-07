import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clubReducer from "./clubSlice";
import studentSliceReducer from "./studentDataSlice";
import academicReducer from "./academicSlice";
import studentConnectReducer from "./studentConnectSlice";
import updateReducer from "./updateSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
    academic: academicReducer,
    updates: updateReducer,
    studentconnect: studentConnectReducer,
    student: studentSliceReducer,
  },
});

export default appStore;
