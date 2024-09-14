import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { useNavigate } from "react-router-dom";
// import { addClub } from "../store/clubSlice";
// import { addImportant, addNotes, addPyq } from "../store/academicSlice";
import { addDoubt } from "../store/studentConnectSlice";

const getdoubtData = async () => {
  const getReq = useSelector((store) => store?.studentconnect?.data);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    !getReq && getDoubt();
  }, []);

  const getDoubt = async () => {
    try {
      let data = await api.get(
        "https://airosphere-ggits.vercel.app/studentconnect/getdoubt"
      );

      if (data?.status === 200 && data?.data[0]?.title) {
        const currData = data?.data;
        dispath(addDoubt(currData));
        // console.log(currData);
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

export default getdoubtData;
