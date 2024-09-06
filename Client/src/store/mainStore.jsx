import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import clubReducer from "./clubSlice";

import academicReducer from "./academicSlice";
import studentConnectReducer from "./studentConnectSlice";
import updateReducer from "./updateSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
    academic: academicReducer,
<<<<<<< Updated upstream
    updates: updateReducer,
=======
   
>>>>>>> Stashed changes
    studentconnect: studentConnectReducer,
  },
});

export default appStore;
