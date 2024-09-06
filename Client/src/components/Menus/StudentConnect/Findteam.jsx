import React from "react";
import { FaUserCircle, FaUsers, FaCode } from "react-icons/fa"; // Importing icons
import getTeamData from "../../../utils/getTeamsData";
import { useSelector } from "react-redux";

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
        <div className="absolute inset-0 bg-indigo-600 opacity-50"></div>
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

// Main Find Teammate component with Poster Name and Enhanced Design
const FindTeammate = () => {
  const getTeams = useSelector((store) => store?.studentconnect?.teamsdata);
  console.log(getTeams);
  getTeamData();
  return (
    <div className="bg-gray-50">
      {/* Banner */}
      <Banner />
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
                    <div className="relative top-2 mb-3   left-0 right-4 flex items-center text-sm text-gray-600">
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
                          request.skills
                            .split(",") // Convert comma-separated string to array
                            .map((skill, index) => (
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
                    <a
                      href={request.link}
                      className="mt-6 inline-block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindTeammate;
