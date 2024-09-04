import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "./constant";

const getUser = () => {
  const dispath = useDispatch();
  useEffect(() => {
    getUserData();
  }, []);
  console.log("here");

  const getUserData = async () => {
    const data = await api.get("http://localhost:3000/user/getcurruser");
    console.log(data);
  };
};

export default getUser;
