import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { useNavigate } from "react-router-dom";
import { addClub, addClubDetail, addMember } from "../store/clubSlice";

const getClubDetails = async ({ clubname }) => {
  const club = useSelector((store) => store?.club?.clubdetail);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    getClubDetail();
  }, []);

  const getClubDetail = async () => {
    try {
      let data = await api.get(
        "http://localhost:3000/club/clubdetail/" + clubname
      );
      if (data?.status === 200 && data?.data) {
        const clubDetails = data.data[0];
        console.log(clubDetails);
        dispath(addClubDetail(clubDetails));
        return clubDetails;
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

export default getClubDetails;