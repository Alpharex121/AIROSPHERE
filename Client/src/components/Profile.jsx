import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileimage from "../assets/profile.png";

const Profile = () => {
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  if (!data) Navigate("/profile");

  return (
    <div className="flex flex-col items-center pt-10 h-[82vh] bg-gray-100">
      {/* Profile Card */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-md max-w-md w-full">
        {/* Profile Image and Username */}
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full border-4 border-gray-200"
            src={profileimage}
            alt="Student Profile"
          />
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">
            {data?.username}
          </h1>
        </div>

        {/* Student Details */}
        <div className="mt-6 text-gray-700 space-y-4 w-full">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Name:</span>
            <span>{data?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Semester:</span>
            <span>{data?.semester}th</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Branch:</span>
            <span>AIR</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Enrollment No:</span>
            <span>{data?.enrollmentno}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Email:</span>
            <span>{data?.mail}</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => Navigate("/updatepassword")}
            className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
