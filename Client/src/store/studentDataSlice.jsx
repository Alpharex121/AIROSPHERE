import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const studentDataSlice = createSlice({
  name: "student",
  initialState: {
    studentData: null,
    requestData: null,
  },
  reducers: {
    addStudentData: (state, action) => {
      state.studentData = action.payload;
    },
    addRequestData: (state, action) => {
      state.requestData = action.payload;
    },
  },
});

export const { addStudentData, addRequestData } = studentDataSlice.actions;
export default studentDataSlice.reducer;
