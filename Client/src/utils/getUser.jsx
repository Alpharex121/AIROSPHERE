import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const getUser = async () => {
  const data = useSelector((store) => store?.user);
  const dispath = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const data = await api.get(
        "https://airosphere-ggits.vercel.app/user/getcurruser"
      );
      if (data.status === 200 && data.data.username) {
        const currUser = data.data;
        const userData = {
          username: currUser.username,
          enrollmentno: currUser.enrollmentno,
          name: currUser.name,
          semester: currUser.semester,
          mail: currUser.mail,
          role: currUser.role,
        };
        dispath(addUser(userData));

        return userData;
      } else {
        Navigate("/");
      }
    } catch (error) {
      console.log("User not authenticated");
      Navigate("/");
    }
  };
};

export default getUser;
