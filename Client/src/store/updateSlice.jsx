import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const updateSlice = createSlice({
  name: "updates",
  initialState: {
    branchData: null,
    websiteData: null,
  },
  reducers: {
    addBranchData: (state, action) => {
      state.branchData = action.payload;
    },
    addWebsiteData: (state, action) => {
      state.websiteData = action.payload;
    },
  },
});

export const { addBranchData, addWebsiteData } = updateSlice.actions;
export default updateSlice.reducer;
