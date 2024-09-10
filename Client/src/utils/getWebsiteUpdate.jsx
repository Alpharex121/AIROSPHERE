import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { useNavigate } from "react-router-dom";
import { addClub } from "../store/clubSlice";
import { addImportant, addNotes, addPyq } from "../store/academicSlice";
import { addPeer, addTeam } from "../store/studentConnectSlice";
import { addBranchData, addWebsiteData } from "../store/updateSlice";

const getWebsiteUpdates = async () => {
  const updates = useSelector((store) => store?.updates?.websiteData);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    !updates && getUpdate();
  }, []);

  const getUpdate = async () => {
    try {
      let data = await api.get(
        "https://airosphere-ggits.vercel.app/notification/website"
      );

      if (data?.status === 200 && data?.data[0]?.title) {
        const currData = data?.data;
        dispath(addWebsiteData(currData));
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

export default getWebsiteUpdates;
