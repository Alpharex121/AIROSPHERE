import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { useNavigate } from "react-router-dom";
import { addClub } from "../store/clubSlice";

const getClubData = async () => {
  const club = useSelector((store) => store?.club?.clubdata);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    !club && getClubData();
  }, []);

  const getClubData = async () => {
    try {
      let data = await api.get("https://airosphere-ggits.vercel.app/club");
      if (data?.status === 200 && data?.data[0]?.name) {
        const clubs = data.data;
        dispath(addClub(clubs));
        return clubs;
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

export default getClubData;
