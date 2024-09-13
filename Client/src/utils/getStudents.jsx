import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { addStudentData } from "../store/studentDataSlice";

const getStudents = async () => {
  const studentData = useSelector((store) => store?.student?.studentData);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    !studentData && getSudent();
  }, []);

  const getSudent = async () => {
    try {
      const data = await api.get(
        "https://airosphere-ggits.vercel.app/user/getallstudents"
      );
      if (data.status === 200 && data.data[0].username) {
        const currUser = data.data;
        dispath(addStudentData(currUser));

        return currUser;
      } else {
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
      Navigate("/");
    }
  };
};

export default getStudents;
