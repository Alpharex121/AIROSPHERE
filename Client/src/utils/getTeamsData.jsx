<<<<<<< Updated upstream
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { useNavigate } from "react-router-dom";
import { addClub } from "../store/clubSlice";
import { addImportant, addNotes, addPyq } from "../store/academicSlice";
import { addTeam } from "../store/studentConnectSlice";

const getTeamData = async () => {
  const getTeams = useSelector((store) => store?.studentconnect?.teamsdata);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    !getTeams && getTeamRequest();
  }, []);

  const getTeamRequest = async () => {
    try {
      let data = await api.get("http://localhost:3000/studentconnect/getteams");

      if (data?.status === 200 && data?.data[0]?.title) {
        const currData = data?.data;
        dispath(addTeam(currData));
        console.log(currData);
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

export default getTeamData;
=======
import React from 'react'

const getTeamsData = () => {
  return (
    <div>
      
    </div>
  )
}

export default getTeamsData
>>>>>>> Stashed changes
