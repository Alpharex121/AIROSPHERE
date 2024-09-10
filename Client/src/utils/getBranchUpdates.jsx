import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { useNavigate } from "react-router-dom";
import { addClub } from "../store/clubSlice";
import { addImportant, addNotes, addPyq } from "../store/academicSlice";
import { addPeer, addTeam } from "../store/studentConnectSlice";
import { addBranchData } from "../store/updateSlice";

const getBranchUpdates = async () => {
  const updates = useSelector((store) => store?.updates?.branchData);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    !updates && getUpdate();
  }, []);

  const getUpdate = async () => {
    try {
      let data = await api.get(
        "https://airosphere-ggits.vercel.app/notification/branch"
      );

      if (data?.status === 200 && data?.data[0]?.title) {
        const currData = data?.data;
        dispath(addBranchData(currData));
        // console.log(currData);
      } else {
        Navigate("/");
        return;
      }
    } catch (error) {
      console.log("User not authenticated" + error);
      Navigate("/");
    }
  };
};

export default getBranchUpdates;
