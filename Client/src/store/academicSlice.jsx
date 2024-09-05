import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const clubSlice = createSlice({
  name: "academic",
  initialState: {
    notesdata: null,
    pyqdata: null,
    importantquesdata: null,
  },
  reducers: {
    addNotes: (state, action) => {
      state.notesdata = action.payload;
    },
    addPyq: (state, action) => {
      state.pyqdata = action.payload;
    },
    addImportant: (state, action) => {
      state.importantquesdata = action.payload;
    },
  },
});

export const { addNotes, addPyq, addImportant } = clubSlice.actions;
export default clubSlice.reducer;
