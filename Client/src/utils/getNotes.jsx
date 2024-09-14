import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { useNavigate } from "react-router-dom";
import { addClub } from "../store/clubSlice";
import { addImportant, addNotes, addPyq } from "../store/academicSlice";

const getNotesData = async ({ subcode, type }) => {
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    getNotesDatas();
  }, []);

  const getNotesDatas = async () => {
    try {
      let data = await api.get(
        "https://airosphere-ggits.vercel.app/academic/" + type + "/" + subcode
      );

      if (data?.status === 200 && data?.data) {
        const notes = data.data;
        if (type === "notes") dispath(addNotes(notes));
        if (type === "pyq") dispath(addPyq(notes));
        if (type === "important") dispath(addImportant(notes));
        return notes;
      } else {
        Navigate("/");
        return;
      }
    } catch (error) {
      // console.log("User not authenticated" + error);
      Navigate("/");
    }
  };
};

export default getNotesData;
