import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { addRequestData, addStudentData } from "../store/studentDataSlice";

const getRequests = async () => {
  const requests = useSelector((store) => store?.student?.requestData);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    !requests && getRequestsData();
  }, []);

  const getRequestsData = async () => {
    try {
      const data = await api.get("http://localhost:3000/requests");
      if (data.status === 200 && data?.data[0]?.username) {
        const currRequest = data.data;
        dispath(addRequestData(currRequest));

        return addRequestData;
      } else {
        Navigate("/");
      }
    } catch (error) {
      console.log("User not authenticated" + error);
      Navigate("/");
    }
  };
};

export default getRequests;
