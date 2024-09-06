import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const studentConnectSlice = createSlice({
  name: "studentconnect",
  initialState: {
    teamsdata: null,
    peersdata: null,
    doubtsdata: null,
  },
  reducers: {
    addTeam: (state, action) => {
      state.teamsdata = action.payload;
    },
    addPeer: (state, action) => {
      state.peersdata = action.payload;
    },
    addDoubt: (state, action) => {
      state.doubtsdata = action.payload;
    },
  },
});

export const { addTeam, addPeer, addDoubt } = studentConnectSlice.actions;
export default studentConnectSlice.reducer;
