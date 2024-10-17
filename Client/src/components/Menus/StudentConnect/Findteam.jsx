/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaUserCircle, FaUsers, FaCode } from "react-icons/fa"; // Importing icons
import getTeamData from "../../../utils/getTeamsData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Modal from "react-modal"; // Custom Modal for confirmation
import { api } from "../../../utils/constant";
import { addTeam } from "../../../store/studentConnectSlice";
import { Link } from "react-router-dom";
Modal.setAppElement("#root");

// Mock current user (you would get this from auth in a real app)

// Banner component
const Banner = () => {
  return (
    <div className="relative bg-indigo-600">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-50"
          src="https://media.istockphoto.com/id/1433126431/photo/silhouette-of-climbers-who-climbed-to-the-top-of-the-mountain-thanks-to-mutual-assistance-and.jpg?s=2048x2048&w=is&k=20&c=v2xUW_J3PaWEWFbldOqnzYEdcUPRfQ1RuySETvI001I="
          alt="Find a teammate"
        />
        <div className="absolute inset-0 bg-indigo-900 opacity-50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Find Your Perfect Teammate
        </h1>
        <p className="mt-4 text-lg text-indigo-100">
          Collaborate with skilled individuals on exciting projects. Browse the
          latest teammate requests and connect with others.
        </p>
        <a
          href="#"
          className="mt-8 inline-block bg-white text-indigo-600 font-semibold py-2 px-6 rounded hover:bg-gray-200 transition duration-300"
        >
          Start Searching
        </a>
      </div>
    </div>
  );
};

// Custom Confirm Modal Component
const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this teammate request?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Main Find Teammate component with Poster Name and Enhanced Design
const FindTeammate = () => {
  const getTeams = useSelector((store) => store?.studentconnect?.teamsdata);
  const data = useSelector((store) => store?.user);
  const currentUser = data?.username;
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  getTeamData();

  const handleDelete = (id) => {
    setSelectedRequestId(id); // Set the selected request ID
    setIsModalOpen(true); // Open modal
  };

  const confirmDelete = async () => {
    try {
      // Use selectedRequestId to delete the request
      const data = await api.delete(
        "https://airosphere-ggits.vercel.app/studentconnect/deleteteampost/" +
          selectedRequestId
      );
      // console.log(data);
      const updated = getTeams.filter((team) => {
        return team?._id.toString() !== data.data?._id;
      });
      dispatch(addTeam(updated));
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleLinkClick = (link) => {
    console.log("here");
    if (data?.role !== "demo")
      window.open(link, "_blank", "noopener,noreferrer");
    else return;
  };

  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <Banner />

      {/* "Find a Teammate" Button */}

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Link
          to={
            data?.role !== "demo" ? "/studentconnect/newfindteamrequest" : null
          }
        >
          <button
            className={`bg-indigo-600 text-white py-2 ${
              data?.role === "demo" && "cursor-not-allowed"
            } px-4 rounded-lg hover:bg-indigo-700 transition duration-300`}
          >
            Find a Teammate
          </button>
        </Link>
      </div>

      {/* Teammate Requests */}
      {getTeams && (
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Teammate Requests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getTeams.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:border-indigo-500 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6 relative">
                    {/* Poster Info */}
                    <div className="relative top-2 mb-3 left-0 right-4 flex items-center text-sm text-gray-600">
                      <FaUserCircle className="text-gray-400 mr-1" />{" "}
                      {request.postername}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {request.title}
                    </h3>
                    {/* Description */}
                    <p className="text-gray-600 mt-2">{request.description}</p>

                    {/* Openings Section */}
                    <div className="mt-4 flex items-center text-sm font-medium text-gray-700">
                      <FaUsers className="text-indigo-500 mr-2" />{" "}
                      {request.opening} Opening
                      {request.opening > 1 ? "s" : ""}
                    </div>

                    {/* Skills Section */}
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800">
                        Required Skills:
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {request.skills &&
                          request.skills.split(",").map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full"
                            >
                              <FaCode className="mr-2" /> {skill.trim()}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button
                      onClick={() => handleLinkClick(request.link)}
                      className={`mt-6 inline-block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 ${
                        data?.role === "demo" && "cursor-not-allowed"
                      }`}
                    >
                      Apply Now
                    </button>

                    {/* Delete Button for Poster */}
                    {(request.postername === currentUser ||
                      data?.role === "admin" ||
                      data?.role === "modhead") && (
                      <button
                        onClick={() => handleDelete(request._id)}
                        className="mt-4 inline-block w-full text-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default FindTeammate;
