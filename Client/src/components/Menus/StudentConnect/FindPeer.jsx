import React from "react";
import { FaUserCircle, FaUsers, FaCode } from "react-icons/fa"; // Importing icons
import getPeerData from "../../../utils/getPeer";
import { useSelector } from "react-redux";

const PeerBanner = () => {
  return (
    <div className="relative bg-indigo-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Find a teammate"
        />
        <div className="absolute inset-0 b opacity-20"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-white">
          Find a Peer for Programming
        </h1>
        <p className="mt-4 text-lg text-indigo-100">
          Join forces with a peer to solve coding challenges, build projects, or
          improve your skills.
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

// Main Peer Programming Component
const FindPeer = () => {
  const peerRequests = useSelector((store) => store?.studentconnect?.peersdata);
  console.log(peerRequests);
  getPeerData();
  return (
    peerRequests && (
      <div className="bg-gray-100">
        {/* Banner */}
        <PeerBanner />

        {/* Peer Requests */}
        <div className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
              Available Peers
            </h2>

            {/* List of Peer Requests */}
            <div className="space-y-8">
              {peerRequests.map((request) => (
                <div
                  key={request.id}
                  className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Row Layout with Poster Info and Details */}
                  <div className="flex items-center space-x-6 p-6">
                    {/* Poster Avatar */}
                    <div className="flex-shrink-0">
                      <FaUserCircle className="text-gray-400 text-6xl" />
                    </div>

                    {/* Request Details */}
                    <div className="flex-1">
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-800">
                        {request.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mt-2">
                        {request.description}
                      </p>

                      {/* Poster Name */}
                      <p className="text-gray-500 mt-1">
                        Posted by:{" "}
                        <span className="font-medium">
                          {request.postername}
                        </span>
                      </p>

                      {/* Skills */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {request.skills &&
                          request.skills
                            .split(",") // Convert comma-separated string to array
                            .map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 bg-indigo-100 text-purple-600 text-sm font-medium rounded-full"
                              >
                                <FaCode className="mr-2" /> {skill.trim()}
                              </span>
                            ))}
                      </div>
                    </div>

                    {/* Contact Button */}
                    <div className="flex-shrink-0 cursor-pointer">
                      <a
                        href={request.link}
                        className="inline-block bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300"
                      >
                        Contact Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FindPeer;
