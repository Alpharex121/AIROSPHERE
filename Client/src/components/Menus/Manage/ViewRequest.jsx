import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import getRequests from "../../../utils/getRequest";
import idcard from "../../../assets/idcard.png";
import { api } from "../../../utils/constant";
import { confirmAlert } from "react-confirm-alert"; // Import confirm alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { addRequestData } from "../../../store/studentDataSlice";

const RequestPage = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((store) => store?.user);
  const initialRequests = useSelector((store) => store?.student?.requestData);

  const allowedRoles = ["admin", "professor", "studentmanagemod", "modhead"];
  if (!allowedRoles.includes(data?.role)) {
    Navigate("/"); // Navigate if the user is not authorized
  }
  getRequests();
  console.log(initialRequests);

  // Function to delete a student request by ID
  const handleDelete = async (id) => {
    const response = await api.delete(
      "https://airosphere-ggits.vercel.app/requests/" + id
    );
    console.log("Request deleted successfully");
    console.log(response);
    const initialReq = initialRequests.filter((request) => {
      console.log(request._id.toString() + " " + response.data._id);
      return request._id.toString() !== response.data._id;
    });
    dispatch(addRequestData(initialReq));
  };

  // Confirm delete function
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this request?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
          onClick: () => console.log("Deletion cancelled"),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      overlayClassName: "custom-confirm-overlay",
      customUI: ({ onClose }) => (
        <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Confirm Deletion
          </h1>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this request?
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                handleDelete(id);
                onClose();
              }}
              className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 shadow-md"
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition duration-300 shadow-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
    });
  };

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 via-white to-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-10 text-gray-800 text-center">
        Student Sign-Up Requests
      </h2>
      <div className="max-w-5xl mx-auto space-y-8">
        {!initialRequests || initialRequests.length === 0 ? (
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
                  className="w-48 h-[100%] rounded-lg shadow-lg object-fill"
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
                onClick={() => confirmDelete(request._id)}
                className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 shadow-md"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RequestPage;
