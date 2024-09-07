import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getRequests from "../../../utils/getRequest";
import idcard from "../../../assets/idcard.png";
import { api } from "../../../utils/constant";

const RequestPage = () => {
  const Navigate = useNavigate();
  const data = useSelector((store) => store?.user);
  const initialRequests = useSelector((store) => store?.student?.requestData);
  if (!data || data.role !== "admin") Navigate("/");
  getRequests();
  console.log(initialRequests);

  // Function to delete a student request by ID
  const handleDelete = async (id) => {
    const data = await api.delete("http://localhost:3000/requests/" + id);
    console.log("Request deleted successfully");
    console.log(data);
  };

  return (
    initialRequests && (
      <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-gray-100 min-h-screen">
        <h2 className="text-4xl font-extrabold mb-10 text-gray-800 text-center">
          Student Sign-Up Requests
        </h2>
        <div className="max-w-5xl mx-auto space-y-8">
          {initialRequests.length === 0 ? (
            <p className="text-center text-gray-500">No requests available.</p>
          ) : (
            initialRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white p-8 rounded-xl shadow-2xl flex items-center justify-between space-x-6 transform hover:scale-105 transition-transform duration-300 ease-out"
              >
                {/* Student Information and I-Card */}
                <div className="flex items-start space-x-8">
                  <img
                    src={idcard}
                    alt="Icard"
                    className="w-48 h-[100%] rounded-lg  shadow-lg object-fill"
                  />
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {request.name}
                    </h3>
                    <p className="text-lg text-gray-600">
                      <strong>Username:</strong> {request.username}
                    </p>
                    <p className="text-lg text-gray-600">
                      <strong>Enrollment No:</strong> {request.enrollmentno}
                    </p>
                    <p className="text-lg text-gray-600">
                      <strong>Semester:</strong> {request.semester}
                    </p>
                    <p className="text-lg text-gray-600">
                      <strong>Email:</strong> {request.mail}
                    </p>
                  </div>
                </div>

                {/* Delete Button */}

                <button
                  onClick={() => handleDelete(request._id)}
                  className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 shadow-md"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    )
  );
};

export default RequestPage;
