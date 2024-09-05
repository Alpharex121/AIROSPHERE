import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const clubSlice = createSlice({
  name: "club",
  initialState: {
    clubdata: null,
    clubdetail: null,
    clubmember: null,
    clubnotificaiton: null,
  },
  reducers: {
    addClub: (state, action) => {
      state.clubdata = action.payload;
    },
    addMember: (state, action) => {
      state.clubmember = action.payload;
    },
    addClubDetail: (state, action) => {
      state.clubdetail = action.payload;
    },
    addNotification: (state, action) => {
      state.clubnotificaiton = action.payload;
    },
    removeClub: (state, action) => {
      state.clubdata = null;
    },
  },
});

export const {
  addClub,
  removeClub,
  addMember,
  addNotification,
  addClubDetail,
} = clubSlice.actions;
export default clubSlice.reducer;
